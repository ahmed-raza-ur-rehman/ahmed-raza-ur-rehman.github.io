from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import sys

ROOT = Path(__file__).resolve().parent.parent

REQUIRED_FILES = [
    'index.html',
    'blog/index.html',
    'blog/post.html',
    'admin/index.html',
    'css/main.css',
    'css/components.css',
    'css/animations.css',
    'js/main.js',
    'js/cursor.js',
    'js/site-data.js',
    'robots.txt',
    'sitemap.xml',
]

HTML_FILES = [
    ROOT / 'index.html',
    ROOT / 'blog' / 'index.html',
    ROOT / 'blog' / 'post.html',
    ROOT / 'admin' / 'index.html',
]


class RefParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []

    def handle_starttag(self, tag, attrs):
        attrs_map = dict(attrs)
        if tag in {'script', 'img'} and 'src' in attrs_map:
            self.refs.append(attrs_map['src'])
        if tag in {'link', 'a'} and 'href' in attrs_map:
            self.refs.append(attrs_map['href'])


def is_external(ref: str) -> bool:
    parsed = urlparse(ref)
    if parsed.scheme in {'http', 'https', 'mailto', 'tel', 'data'}:
        return True
    return False


def normalize_local_ref(ref: str, html_dir: Path) -> Path | None:
    if not ref or ref.startswith('#'):
        return None
    no_query = ref.split('?', 1)[0].split('#', 1)[0]
    if not no_query:
        return None
    candidate = (html_dir / no_query).resolve()
    return candidate


def validate_required_files(errors: list[str]) -> None:
    for rel in REQUIRED_FILES:
        if not (ROOT / rel).exists():
            errors.append(f'Missing required file: {rel}')


def validate_html_references(errors: list[str]) -> None:
    for html_file in HTML_FILES:
        if not html_file.exists():
            errors.append(f'HTML file not found: {html_file.relative_to(ROOT)}')
            continue

        parser = RefParser()
        parser.feed(html_file.read_text(encoding='utf-8', errors='ignore'))
        for ref in parser.refs:
            if is_external(ref):
                continue
            target = normalize_local_ref(ref, html_file.parent)
            if target is None:
                continue

            if not str(target).startswith(str(ROOT.resolve())):
                errors.append(f'Path escapes repository root in {html_file.relative_to(ROOT)}: {ref}')
                continue

            if not target.exists():
                errors.append(
                    f'Broken local reference in {html_file.relative_to(ROOT)}: {ref}'
                )


def main() -> int:
    errors: list[str] = []
    validate_required_files(errors)
    validate_html_references(errors)

    if errors:
        print('Validation failed:')
        for item in errors:
            print(f'- {item}')
        return 1

    print('Validation passed.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
