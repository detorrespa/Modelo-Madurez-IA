// AI Maturity Assessment Application

class AIMaturityAssessment {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.questions = [];
        this.dimensionScores = {};
        this.totalScore = 0;
        this.maturityLevel = 1;
        
        this.initializeData();
        this.initializeEventListeners();
        this.showScreen('welcome-screen');
    }

    initializeData() {
        // Question data organized by dimensions
        this.questionsData = {
            "Estrategia y Liderazgo": [
                {
                    "pregunta": "¿Su organización tiene una estrategia formal de IA documentada y comunicada?",
                    "opciones": {
                        "1": "No existe estrategia formal",
                        "2": "Estrategia inicial en desarrollo", 
                        "3": "Estrategia definida y alineada con objetivos de negocio",
                        "4": "IA es central en la estrategia corporativa",
                        "5": "IA define nuevos mercados y oportunidades"
                    }
                },
                {
                    "pregunta": "¿Qué nivel de conocimiento tienen los líderes sobre el potencial de la IA?",
                    "opciones": {
                        "1": "Conocimiento muy limitado",
                        "2": "Conocimiento básico",
                        "3": "Buenos fundamentos y visión clara", 
                        "4": "Líderes bien informados y comprometidos",
                        "5": "Liderazgo experto e innovador"
                    }
                },
                {
                    "pregunta": "¿Existe un responsable o equipo dedicado a la estrategia de IA?",
                    "opciones": {
                        "1": "No hay responsables específicos",
                        "2": "Responsabilidad compartida informalmente",
                        "3": "Equipo básico designado",
                        "4": "Equipo especializado multidisciplinario", 
                        "5": "Centro de excelencia establecido"
                    }
                }
            ],
            "Datos y Tecnología": [
                {
                    "pregunta": "¿Cuál es el estado de la infraestructura de datos de su organización?",
                    "opciones": {
                        "1": "Datos dispersos, sin gestión centralizada",
                        "2": "Sistemas básicos de gestión de datos",
                        "3": "Arquitectura de datos moderna y escalable",
                        "4": "Ecosistema de datos en tiempo real",
                        "5": "Inteligencia aumentada y ecosistemas avanzados"
                    }
                },
                {
                    "pregunta": "¿Qué porcentaje de sus datos considera de alta calidad y listos para IA?",
                    "opciones": {
                        "1": "< 20%",
                        "2": "20-40%", 
                        "3": "40-60%",
                        "4": "60-80%",
                        "5": "> 80%"
                    }
                },
                {
                    "pregunta": "¿Qué tipo de infraestructura tecnológica tienen para IA?",
                    "opciones": {
                        "1": "Herramientas básicas, sin infraestructura específica",
                        "2": "Plataformas cloud básicas",
                        "3": "Infraestructura escalable y segura",
                        "4": "Sistemas avanzados y auto-adaptativos",
                        "5": "Desarrollo de tecnologías IA propietarias"
                    }
                }
            ],
            "Talento y Capacidades": [
                {
                    "pregunta": "¿Qué porcentaje de su personal tiene formación en IA?",
                    "opciones": {
                        "1": "< 5%",
                        "2": "5-15%",
                        "3": "15-35%", 
                        "4": "35-65%",
                        "5": "> 65%"
                    }
                },
                {
                    "pregunta": "¿Tienen especialistas en IA/Data Science en la organización?",
                    "opciones": {
                        "1": "No tenemos especialistas",
                        "2": "1-2 especialistas básicos",
                        "3": "Equipo pequeño pero especializado",
                        "4": "Múltiples equipos especializados",
                        "5": "Organización con capacidades IA nativas"
                    }
                },
                {
                    "pregunta": "¿Existe un programa de capacitación continua en IA?",
                    "opciones": {
                        "1": "No existe programa formal",
                        "2": "Capacitación esporádica",
                        "3": "Programa estructurado básico",
                        "4": "Programa avanzado y continuo",
                        "5": "Centro de formación e investigación"
                    }
                }
            ],
            "Implementación y Adopción": [
                {
                    "pregunta": "¿Qué porcentaje de sus procesos de negocio utilizan IA?",
                    "opciones": {
                        "1": "< 10%",
                        "2": "10-25%",
                        "3": "25-50%",
                        "4": "50-80%", 
                        "5": "> 80%"
                    }
                },
                {
                    "pregunta": "¿Cuántos proyectos de IA están en producción?",
                    "opciones": {
                        "1": "Ninguno o muy pocos pilotos",
                        "2": "1-3 proyectos en producción",
                        "3": "4-10 proyectos escalados",
                        "4": "11-25 proyectos integrados",
                        "5": "> 25 proyectos o IA omnipresente"
                    }
                },
                {
                    "pregunta": "¿Cómo miden el ROI de los proyectos de IA?",
                    "opciones": {
                        "1": "No medimos ROI específico",
                        "2": "Métricas básicas ocasionales",
                        "3": "KPIs definidos y seguimiento regular",
                        "4": "Métricas avanzadas y valor integral",
                        "5": "Medición continua y optimización automática"
                    }
                }
            ],
            "Gobernanza y Ética": [
                {
                    "pregunta": "¿Tienen políticas de gobernanza para el uso de IA?",
                    "opciones": {
                        "1": "No existen políticas específicas",
                        "2": "Políticas básicas en desarrollo",
                        "3": "Políticas completas implementadas",
                        "4": "Gobernanza adaptativa y controles avanzados",
                        "5": "Estándares éticos de vanguardia"
                    }
                },
                {
                    "pregunta": "¿Consideran aspectos éticos y de sesgo en sus implementaciones de IA?",
                    "opciones": {
                        "1": "No se considera sistemáticamente",
                        "2": "Consideración básica ocasional", 
                        "3": "Evaluación regular de sesgo y ética",
                        "4": "Marcos éticos integrados",
                        "5": "Liderazgo en IA responsable"
                    }
                },
                {
                    "pregunta": "¿Qué nivel de seguridad y privacidad tienen en sus sistemas de IA?",
                    "opciones": {
                        "1": "Seguridad básica estándar",
                        "2": "Medidas de seguridad mejoradas",
                        "3": "Protocolos robustos específicos para IA",
                        "4": "Seguridad avanzada y monitoreo continuo", 
                        "5": "Sistemas de seguridad auto-adaptativos"
                    }
                }
            ]
        };

        // Maturity levels data
        this.maturityLevels = {
            "1": {
                "nombre": "Ad-hoc",
                "descripcion": "Exploración inicial y concienciación",
                "color": "#f87171",
                "recomendaciones": [
                    "Identificar 3-5 casos de uso prioritarios para IA",
                    "Formar un equipo básico de exploración de IA", 
                    "Completar 1-2 proyectos piloto en 6 meses",
                    "Capacitar al 5% del personal en conceptos básicos de IA",
                    "Establecer políticas básicas de uso de datos"
                ]
            },
            "2": {
                "nombre": "Experimental", 
                "descripcion": "Experimentación y adopción inicial",
                "color": "#fb923c",
                "recomendaciones": [
                    "Escalar 2-3 pilotos exitosos a producción",
                    "Implementar arquitectura básica de datos",
                    "Formar equipo especializado en IA/Data Science",
                    "Capacitar al 15% del personal en herramientas de IA",
                    "Establecer métricas de éxito para proyectos de IA"
                ]
            },
            "3": {
                "nombre": "Operacionalizado",
                "descripcion": "Implementación sistemática y escalable", 
                "color": "#fbbf24",
                "recomendaciones": [
                    "Integrar IA en 25-50% de procesos críticos",
                    "Lograr ROI positivo y medible en todos los proyectos",
                    "Establecer centro de competencias en IA",
                    "Implementar gobernanza completa de IA",
                    "Capacitar al 35% del personal en uso avanzado de IA"
                ]
            },
            "4": {
                "nombre": "Transformacional",
                "descripcion": "IA como ventaja competitiva estratégica",
                "color": "#34d399", 
                "recomendaciones": [
                    "Transformar modelo de negocio con IA",
                    "Crear nuevas líneas de productos/servicios",
                    "Establecer ventaja competitiva sostenible",
                    "Desarrollar ecosistema de socios tecnológicos",
                    "Ser referente en el sector en uso de IA"
                ]
            },
            "5": {
                "nombre": "Innovador",
                "descripcion": "Liderazgo e innovación disruptiva",
                "color": "#3b82f6",
                "recomendaciones": [
                    "Desarrollar tecnologías IA propietarias",
                    "Crear nuevos mercados y oportunidades", 
                    "Establecer estándares de la industria",
                    "Liderar en IA responsable y ética",
                    "Generar IP y valor a través de IA avanzada"
                ]
            }
        };

        // Flatten questions with dimension info
        this.questions = [];
        Object.keys(this.questionsData).forEach(dimension => {
            this.questionsData[dimension].forEach(question => {
                this.questions.push({
                    dimension: dimension,
                    question: question.pregunta,
                    options: question.opciones
                });
            });
        });

        // Initialize answers array
        this.answers = new Array(this.questions.length).fill(null);
    }

    initializeEventListeners() {
        // Start assessment button
        document.getElementById('start-assessment').addEventListener('click', () => {
            this.startAssessment();
        });

        // Navigation buttons
        document.getElementById('prev-button').addEventListener('click', () => {
            this.previousQuestion();
        });

        document.getElementById('next-button').addEventListener('click', () => {
            this.nextQuestion();
        });

        // Results actions
        document.getElementById('restart-assessment').addEventListener('click', () => {
            this.restartAssessment();
        });

        document.getElementById('view-details').addEventListener('click', () => {
            this.showDetailedAnalysis();
        });

        document.getElementById('back-to-results').addEventListener('click', () => {
            this.showScreen('results-screen');
        });
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        document.getElementById(screenId).classList.add('active');
    }

    startAssessment() {
        this.currentQuestionIndex = 0;
        this.answers = new Array(this.questions.length).fill(null);
        this.showScreen('assessment-screen');
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.questions.length;

        // Update dimension badge
        document.getElementById('current-dimension').textContent = question.dimension;

        // Update question title
        document.getElementById('question-title').textContent = question.question;

        // Create options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        Object.keys(question.options).forEach(value => {
            const optionButton = document.createElement('button');
            optionButton.className = 'option-button';
            optionButton.innerHTML = `
                <span class="option-value">${value}</span>
                ${question.options[value]}
            `;
            
            // Check if this option is already selected
            if (this.answers[this.currentQuestionIndex] === parseInt(value)) {
                optionButton.classList.add('selected');
            }

            optionButton.addEventListener('click', () => {
                this.selectOption(parseInt(value));
            });

            optionsContainer.appendChild(optionButton);
        });

        // Update navigation buttons
        document.getElementById('prev-button').disabled = this.currentQuestionIndex === 0;
        document.getElementById('next-button').disabled = this.answers[this.currentQuestionIndex] === null;
    }

    selectOption(value) {
        this.answers[this.currentQuestionIndex] = value;
        
        // Update UI
        document.querySelectorAll('.option-button').forEach(button => {
            button.classList.remove('selected');
        });
        
        event.target.closest('.option-button').classList.add('selected');
        
        // Enable next button
        document.getElementById('next-button').disabled = false;
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.calculateResults();
            this.showResults();
        }
    }

    calculateResults() {
        // Calculate dimension scores
        this.dimensionScores = {};
        Object.keys(this.questionsData).forEach(dimension => {
            this.dimensionScores[dimension] = 0;
        });

        // Sum scores by dimension
        this.questions.forEach((question, index) => {
            if (this.answers[index] !== null) {
                this.dimensionScores[question.dimension] += this.answers[index];
            }
        });

        // Calculate total score
        this.totalScore = Object.values(this.dimensionScores).reduce((sum, score) => sum + score, 0);

        // Determine maturity level based on total score
        if (this.totalScore >= 68) this.maturityLevel = 5;
        else if (this.totalScore >= 53) this.maturityLevel = 4;
        else if (this.totalScore >= 38) this.maturityLevel = 3;
        else if (this.totalScore >= 23) this.maturityLevel = 2;
        else this.maturityLevel = 1;
    }

    showResults() {
        this.showScreen('results-screen');

        // Display total score
        document.getElementById('total-score').textContent = this.totalScore;

        // Display maturity level
        const levelData = this.maturityLevels[this.maturityLevel];
        const levelBadge = document.getElementById('maturity-level-badge');
        levelBadge.textContent = `Nivel ${this.maturityLevel}`;
        levelBadge.style.backgroundColor = levelData.color;

        document.getElementById('maturity-level-name').textContent = levelData.nombre;
        enviarResultadoPorEmail(levelData.nombre);
        document.getElementById('maturity-level-description').textContent = levelData.descripcion;

        // Create dimensions chart
        this.createDimensionsChart();

        // Display recommendations
        this.displayRecommendations();
    }

    createDimensionsChart() {
        const ctx = document.getElementById('dimensionsChart').getContext('2d');
        
        const dimensions = Object.keys(this.dimensionScores);
        const scores = Object.values(this.dimensionScores);
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: dimensions,
                datasets: [{
                    label: 'Puntuación',
                    data: scores,
                    backgroundColor: 'rgba(33, 128, 141, 0.2)',
                    borderColor: 'rgba(33, 128, 141, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(33, 128, 141, 1)',
                    pointBorderColor: '#fff',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 15,
                        ticks: {
                            stepSize: 3
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    displayRecommendations() {
        const levelData = this.maturityLevels[this.maturityLevel];
        const recommendationsList = document.getElementById('recommendations-list');
        recommendationsList.innerHTML = '';

        levelData.recomendaciones.forEach((recommendation, index) => {
            const recommendationItem = document.createElement('div');
            recommendationItem.className = 'recommendation-item';
            recommendationItem.innerHTML = `
                <div class="recommendation-icon">${index + 1}</div>
                <div class="recommendation-text">${recommendation}</div>
            `;
            recommendationsList.appendChild(recommendationItem);
        });
    }

    showDetailedAnalysis() {
        this.showScreen('details-screen');

        const dimensionsDetailed = document.getElementById('dimensions-detailed');
        dimensionsDetailed.innerHTML = '';

        Object.keys(this.questionsData).forEach(dimension => {
            const dimensionQuestions = this.questions
                .map((q, index) => ({ ...q, index, answer: this.answers[index] }))
                .filter(q => q.dimension === dimension);

            const dimensionScore = this.dimensionScores[dimension];
            const maxScore = dimensionQuestions.length * 5;

            const dimensionDetail = document.createElement('div');
            dimensionDetail.className = 'dimension-detail';
            dimensionDetail.innerHTML = `
                <div class="dimension-header">
                    <h3 class="dimension-name">${dimension}</h3>
                    <div class="dimension-score">
                        <span class="score-badge">${dimensionScore} / ${maxScore}</span>
                    </div>
                </div>
                <div class="dimension-questions">
                    ${dimensionQuestions.map(q => `
                        <div class="question-summary">
                            <div class="question-text">${q.question}</div>
                            <div class="answer-score">${q.answer || 0}/5</div>
                        </div>
                    `).join('')}
                </div>
            `;

            dimensionsDetailed.appendChild(dimensionDetail);
        });
    }

    restartAssessment() {
        this.currentQuestionIndex = 0;
        this.answers = new Array(this.questions.length).fill(null);
        this.dimensionScores = {};
        this.totalScore = 0;
        this.maturityLevel = 1;
        this.showScreen('welcome-screen');
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIMaturityAssessment();
});
