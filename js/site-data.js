window.PORTFOLIO_DATA = {
  profile: {
    name: 'Ahmed Raza Ur Rehman',
    role: 'Computer Engineering Final-Year Student',
    graduating: 'Sep 2026',
    institution: 'KICSIT, Institute of Space Technology',
    cgpa: '3.49/4.0',
    location: 'Islamabad, Pakistan',
    email: 'ahmadrazarehman033@gmail.com',
    phone: '+92 310 9391744',
    cv: 'assets/cv/ahmed-raza-ur-rehman-cv.pdf',
    social: {
      github: 'https://github.com/ahmed-raza-ur-rehman',
      linkedin: 'https://www.linkedin.com/in/ahmed-raza-ur-rehman',
      email: 'mailto:ahmadrazarehman033@gmail.com'
    }
  },
  taglines: [
    'Building computing things from first principles',
    'From transistors to FPGAs to firmware',
    'Digital hardware, embedded systems, IC design',
    'Making hardware actually work'
  ],
  stats: [
    { label: 'CGPA', value: '3.49' },
    { label: 'Semesters', value: '8' },
    { label: 'Projects', value: '12+' },
    { label: 'Domains', value: '9' }
  ],
  skills: {
    hardware: [
      { name: 'Verilog', level: 'Strong', description: 'Used in the processor project and HDL practice.' },
      { name: 'SystemVerilog', level: 'Familiar', description: 'Working knowledge from digital design study.' },
      { name: 'VHDL', level: 'Familiar', description: 'Comparable HDL exposure.' },
      { name: 'Digital Logic Design', level: 'Strong', description: 'Core coursework and hands-on builds.' },
      { name: 'Computer Architecture', level: 'Strong', description: 'Processor and datapath thinking.' },
      { name: 'FPGA Implementation', level: 'Strong', description: 'Synthesis, timing, and bitstreams on hardware.' },
      { name: 'RTL Design', level: 'Familiar', description: 'Project-driven RTL thinking.' },
      { name: 'Pipelined Processor Design', level: 'Project', description: 'Built and debugged a pipelined CPU flow.' }
    ],
    embedded: [
      { name: 'C / C++', level: 'Strong', description: 'Firmware and systems programming.' },
      { name: 'STM32', level: 'Project', description: 'Real-time firmware for FYP hardware.' },
      { name: 'Embedded Systems', level: 'Strong', description: 'Hardware-software integration work.' },
      { name: 'Stepper Motor Control', level: 'Project', description: 'Motion control for pick-and-place.' },
      { name: 'Sensor Integration', level: 'Project', description: 'Input handling and subsystem feedback.' },
      { name: 'Assembly Language', level: 'Explored', description: 'Low-level systems curiosity.' },
      { name: 'Microprocessor Systems', level: 'Coursework', description: 'Core microprocessor concepts.' }
    ],
    electronics: [
      { name: 'PCB Design', level: 'Project', description: 'Custom boards for the FYP.' },
      { name: 'Circuit Analysis', level: 'Strong', description: 'Coursework plus self-directed builds.' },
      { name: 'Proteus', level: 'Familiar', description: 'Simulation and validation.' },
      { name: 'Soldering', level: 'Hands-on', description: 'Assembly and repair experience.' },
      { name: 'Transistor-Level Circuits', level: 'Hands-on', description: 'Discrete logic curiosity.' },
      { name: 'First-Principles Electronics', level: 'Personal', description: 'Ben Eater style builds and experiments.' }
    ],
    software: [
      { name: 'JavaScript', level: 'Comfortable', description: 'Interactive web systems and tooling.' },
      { name: 'Python', level: 'Comfortable', description: 'Automation and scripting.' },
      { name: 'Git / GitHub', level: 'Regular use', description: 'Version control and collaboration.' },
      { name: 'Linux CLI', level: 'Comfortable', description: 'Terminal-first workflow.' },
      { name: 'Data Structures', level: 'Coursework', description: 'Algorithmic problem solving.' },
      { name: 'Operating Systems', level: 'Coursework', description: 'Processes, memory, and scheduling.' },
      { name: 'Databases', level: 'Working', description: 'MySQL, PostgreSQL, MongoDB, Firebase.' }
    ],
    creative: [
      { name: 'Blender', level: 'Explored', description: '3D modeling and scene work.' },
      { name: 'Unity', level: 'Explored', description: 'Interactive 3D thinking.' },
      { name: 'AutoCAD', level: 'Explored', description: 'Technical drawing and layout.' },
      { name: 'Machine Learning', level: 'Foundational', description: 'Math, models, and where they fit.' },
      { name: 'Cybersecurity', level: 'Foundational', description: 'Attack surfaces and defensive thinking.' },
      { name: 'Web Development', level: 'Comfortable', description: 'HTML, CSS, JS, and systems UI.' }
    ]
  },
  projects: [
    {
      slug: 'pipelined-processor-on-fpga',
      title: 'Pipelined Processor on FPGA',
      subtitle: 'Computer architecture coursework',
      accent: 'circuit-green',
      tags: ['Verilog', 'VHDL', 'Xilinx ISE', 'Computer Architecture', 'FPGA'],
      status: 'Completed',
      summary: 'Implemented a minimal pipelined processor architecture on FPGA, covering datapath construction, control logic, simulation, synthesis, place-and-route, and bitstream generation.',
      details: 'The hard part was not the HDL syntax. It was tracing timing, control hazards, and the relationship between intent and real hardware behavior. That is the part I value most.',
      progress: 100,
      tools: ['Verilog', 'VHDL', 'Xilinx ISE', 'Timing analysis']
    },
    {
      slug: 'automatic-smd-pick-and-place-machine',
      title: 'Automatic SMD Pick & Place Machine',
      subtitle: 'Final year project',
      accent: 'industrial-blue',
      tags: ['STM32', 'C', 'Firmware', 'PCB Design', 'Hardware-Software Co-design'],
      status: 'In progress',
      summary: 'Designing a pick-and-place machine for PCB assembly with STM32 firmware, motion control, custom boards, and hardware debugging.',
      details: 'This is a full hardware-software co-design project: real-time control, stepper drivers, sensors, and the board-level work that makes the machine operate reliably.',
      progress: 62,
      tools: ['STM32', 'C', 'PCB layout', 'Motion control']
    },
    {
      slug: 'building-computing-from-transistors',
      title: 'Building Computing From Transistors',
      subtitle: 'Personal interest / ongoing',
      accent: 'amber-retro',
      tags: ['Discrete Logic', 'Transistors', 'Computer Architecture', 'First Principles'],
      status: 'Ongoing',
      summary: 'Following builders like Ben Eater and working through discrete logic and transistor-level concepts to understand computing from the bottom up.',
      details: 'This is less a polished project than a persistent habit: understand the stack from transistors to logic to processors, then bring that understanding back into HDL and embedded work.',
      progress: 48,
      tools: ['Discrete logic', 'Breadboarding', 'Circuit analysis']
    }
  ],
  interests: [
    {
      title: 'Digital Hardware & IC Design',
      description: 'FPGAs, RTL design, pipelined architectures, and the path toward custom silicon.',
      tone: 'hardware'
    },
    {
      title: 'Embedded Systems',
      description: 'Firmware, real-time control, STM32, and making software talk to physical hardware.',
      tone: 'embedded'
    },
    {
      title: 'PCB Design & Electronics',
      description: 'Custom boards, circuit design, soldering, and hardware that actually works.',
      tone: 'electronics'
    },
    {
      title: 'Computing From First Principles',
      description: 'Transistors → logic gates → ALUs → processors. Understanding the stack from the bottom up.',
      tone: 'retro'
    },
    {
      title: '3D & Simulation',
      description: 'Blender, Unity, AutoCAD, and spatial thinking across domains.',
      tone: 'creative'
    },
    {
      title: 'Cybersecurity',
      description: 'Systems security and ethical hacking concepts.',
      tone: 'security'
    },
    {
      title: 'Machine Learning',
      description: 'Fundamentals, the math behind it, and where it meets hardware.',
      tone: 'ml'
    }
  ],
  games: [
    {
      id: 'reaction-race',
      title: 'Reaction Race',
      description: 'Click the signal as fast as you can. Scores are time-based.',
      mode: 'reaction'
    },
    {
      id: 'logic-lift',
      title: 'Logic Lift',
      description: 'A short reasoning quiz inspired by the AIDE logic module.',
      mode: 'logic'
    },
    {
      id: 'memory-matrix',
      title: 'Memory Matrix',
      description: 'Repeat the highlighted cells after they disappear.',
      mode: 'memory'
    }
  ],
  blogPosts: [
    {
      slug: 'building-a-pipelined-cpu-without-handwaving',
      title: 'Building a pipelined CPU without handwaving',
      date: '2026-04-03',
      category: 'Project Updates',
      tags: ['FPGA', 'Verilog', 'Computer Architecture'],
      excerpt: 'What broke first was not the code. It was the assumption that the machine would forgive vague thinking.',
      content: '# Building a pipelined CPU without handwaving\n\nI learned the hard way that RTL is a contract. If the contract is vague, the hardware will expose it immediately.\n\n## What mattered\n\n- Timing\n- Control hazards\n- Debugging on real hardware\n\n```verilog\nassign pc_next = branch_taken ? branch_target : pc_plus_4;\n```\n\nThat is the kind of line where the real work is hidden.',
      cover: 'hardware'
    },
    {
      slug: 'why-first-principles-still-matter',
      title: 'Why first principles still matter',
      date: '2026-03-18',
      category: 'Learning Log',
      tags: ['Electronics', 'Transistors', 'Embedded'],
      excerpt: 'The value is not nostalgia. It is being able to reason when the abstraction stops helping.',
      content: '# Why first principles still matter\n\nUnderstanding how a transistor behaves changes how you debug every layer above it.\n\n```text\nInput -> gate -> register -> datapath -> system\n```',
      cover: 'retro'
    },
    {
      slug: 'firmware-that-does-not-fight-the-machine',
      title: 'Firmware that does not fight the machine',
      date: '2026-02-27',
      category: 'Hardware Notes',
      tags: ['STM32', 'Firmware', 'Motion Control'],
      excerpt: 'A good firmware loop respects timing, interrupts, and the physical world it is driving.',
      content: '# Firmware that does not fight the machine\n\nA control loop should be predictable before it is clever.\n\n```c\nwhile (1) {\n  read_sensors();\n  update_motion();\n  service_comm();\n}\n```',
      cover: 'industrial'
    }
  ],
  leaderboardSeed: [
    { name: 'Amina', score: 1240 },
    { name: 'Hamza', score: 1105 },
    { name: 'Sara', score: 980 },
    { name: 'Zain', score: 910 },
    { name: 'Ahmed', score: 888 }
  ]
};

window.PORTFOLIO_UTILS = {
  slugify(value) {
    return String(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' });
  },
  readTimeFromMarkdown(markdown) {
    const words = String(markdown).split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 220));
  },
  loadJSON(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },
  saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return false;
    }
    return true;
  }
};
