// Mock data for Victor Hugo's portfolio

export const portfolioData = {
    personal: {
        name: "Victor Hugo Correia de Melo",
        title: "Desenvolvedor Full Stack",
        subtitle: "Criando soluções digitais inovadoras",
        bio: "Desenvolvedor apaixonado por tecnologia com experiência em desenvolvimento web moderno. Especializado em React, Node.js e soluções em nuvem. Sempre buscando aprender novas tecnologias e contribuir para projetos que fazem a diferença.",
        location: "Brasil",
        email: "victor.melo@email.com",
        phone: "+55 (11) 99999-9999",
        linkedin: "https://linkedin.com/in/victorhugomelo",
        github: "https://github.com/victorhugomelo",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },

    skills: [
        { name: "React", level: 90, category: "Frontend" },
        { name: "JavaScript", level: 95, category: "Programming" },
        { name: "TypeScript", level: 85, category: "Programming" },
        { name: "Node.js", level: 88, category: "Backend" },
        { name: "Python", level: 80, category: "Programming" },
        { name: "MongoDB", level: 82, category: "Database" },
        { name: "PostgreSQL", level: 78, category: "Database" },
        { name: "AWS", level: 75, category: "Cloud" },
        { name: "Docker", level: 80, category: "DevOps" },
        { name: "Git", level: 92, category: "Tools" },
        { name: "Figma", level: 70, category: "Design" },
        { name: "Material-UI", level: 85, category: "Frontend" }
    ],

    projects: [
        {
            id: 1,
            title: "E-commerce Platform",
            description: "Plataforma de e-commerce completa com painel administrativo, sistema de pagamentos e gestão de estoque.",
            longDescription: "Desenvolvida com React, Node.js e MongoDB, inclui autenticação JWT, integração com gateway de pagamento e sistema de notificações em tempo real.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["React", "Node.js", "MongoDB", "Stripe"],
            technologies: ["React", "Express.js", "MongoDB", "Stripe API", "JWT"],
            demoUrl: "https://demo-ecommerce.com",
            repoUrl: "https://github.com/victorhugomelo/ecommerce-platform",
            status: "Completed",
            year: "2024"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "Aplicativo de gerenciamento de tarefas com colaboração em equipe e notificações em tempo real.",
            longDescription: "Interface intuitiva com drag-and-drop, sistema de notificações push, relatórios de produtividade e integração com calendário.",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["React", "Socket.io", "PostgreSQL", "PWA"],
            technologies: ["React", "Socket.io", "PostgreSQL", "Service Workers"],
            demoUrl: "https://taskmanager-demo.com",
            repoUrl: "https://github.com/victorhugomelo/task-manager",
            status: "Completed",
            year: "2023"
        },
        {
            id: 3,
            title: "Weather Dashboard",
            description: "Dashboard meteorológico com previsões detalhadas, mapas interativos e alertas personalizados.",
            longDescription: "Integração com múltiplas APIs meteorológicas, visualização de dados em gráficos interativos e sistema de alertas baseado em localização.",
            image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["Vue.js", "Chart.js", "API", "PWA"],
            technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Mapbox"],
            demoUrl: "https://weather-dashboard-demo.com",
            repoUrl: "https://github.com/victorhugomelo/weather-dashboard",
            status: "Completed",
            year: "2023"
        },
        {
            id: 4,
            title: "Social Media Analytics",
            description: "Ferramenta de análise de redes sociais com relatórios automatizados e insights de engajamento.",
            longDescription: "Coleta e análise de dados de múltiplas plataformas, geração de relatórios personalizados e dashboards interativos para tomada de decisão.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["Python", "Django", "React", "Data Analysis"],
            technologies: ["Django", "React", "Pandas", "Chart.js", "PostgreSQL"],
            demoUrl: "https://social-analytics-demo.com",
            repoUrl: "https://github.com/victorhugomelo/social-analytics",
            status: "In Progress",
            year: "2024"
        },
        {
            id: 5,
            title: "Real Estate Platform",
            description: "Plataforma imobiliária com busca avançada, tours virtuais e sistema de agendamento.",
            longDescription: "Sistema completo para corretores e clientes com filtros inteligentes, integração com mapas, sistema de favoritos e chat em tempo real.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["React", "Next.js", "MongoDB", "Maps API"],
            technologies: ["Next.js", "MongoDB", "Google Maps API", "Socket.io"],
            demoUrl: "https://realestate-demo.com",
            repoUrl: "https://github.com/victorhugomelo/realestate-platform",
            status: "Completed",
            year: "2024"
        },
        {
            id: 6,
            title: "Learning Management System",
            description: "Plataforma de ensino online com videoaulas, quizzes interativos e acompanhamento de progresso.",
            longDescription: "Sistema completo de LMS com streaming de vídeo, sistema de avaliações, gamificação e relatórios detalhados de desempenho.",
            image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["React", "Node.js", "Video Streaming", "Gamification"],
            technologies: ["React", "Express.js", "MongoDB", "AWS S3", "Socket.io"],
            demoUrl: "https://lms-demo.com",
            repoUrl: "https://github.com/victorhugomelo/lms-platform",
            status: "Completed",
            year: "2023"
        }
    ],

    experiences: [
        {
            id: 1,
            title: "Senior Full Stack Developer",
            company: "TechCorp Solutions",
            location: "São Paulo, SP",
            period: "2022 - Presente",
            description: "Liderança técnica em projetos de grande escala, desenvolvimento de arquiteturas escaláveis e mentoria de desenvolvedores júniors.",
            achievements: [
                "Reduziu o tempo de carregamento das aplicações em 40%",
                "Liderou equipe de 5 desenvolvedores",
                "Implementou CI/CD reduzindo bugs em produção em 60%"
            ],
            technologies: ["React", "Node.js", "AWS", "Docker", "MongoDB"]
        },
        {
            id: 2,
            title: "Full Stack Developer",
            company: "Digital Innovation Hub",
            location: "Rio de Janeiro, RJ",
            period: "2020 - 2022",
            description: "Desenvolvimento de aplicações web modernas, integração com APIs externas e otimização de performance.",
            achievements: [
                "Desenvolveu 15+ aplicações web responsivas",
                "Integrou sistemas legados com tecnologias modernas",
                "Aumentou a satisfação do usuário em 35%"
            ],
            technologies: ["Vue.js", "Python", "PostgreSQL", "Docker"]
        },
        {
            id: 3,
            title: "Frontend Developer",
            company: "StartupXYZ",
            location: "Belo Horizonte, MG",
            period: "2019 - 2020",
            description: "Desenvolvimento de interfaces de usuário modernas e responsivas, colaboração direta com designers UX/UI.",
            achievements: [
                "Criou biblioteca de componentes reutilizáveis",
                "Implementou testes automatizados aumentando cobertura em 80%",
                "Otimizou SEO resultando em 50% mais tráfego orgânico"
            ],
            technologies: ["React", "TypeScript", "Styled Components", "Jest"]
        }
    ]
};

// Skills categories for filtering
export const skillCategories = [
    "Todos",
    "Frontend",
    "Backend",
    "Programming",
    "Database",
    "Cloud",
    "DevOps",
    "Tools",
    "Design"
];

// Project tags for filtering
export const projectTags = [
    "Todos",
    "React",
    "Vue.js",
    "Node.js",
    "Python",
    "MongoDB",
    "PostgreSQL",
    "API",
    "PWA",
    "Socket.io",
    "Django",
    "Next.js",
    "AWS"
];