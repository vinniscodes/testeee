document.addEventListener('DOMContentLoaded', () => {

    // Dados de simulação
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    if (clientes.length === 0) {
        clientes = [
            {
                id: 1,
                nome: 'Usuário Teste',
                email: 'test@nowlook.com',
                telefone: '999999999',
                senha: '123456',
                agendamentosFuturos: [
                    { id: 1, estabelecimento: 'Estúdio de Cílios Glam', servico: 'Extensão de Cílios', profissional: 'Profissional A', data: '2025-08-25', hora: '10:00', pagamento: 'online' }
                ],
                historicoCortes: [
                    { estabelecimento: 'Studio Cabelo & Barba', servico: 'Barba Tradicional', data: '2025-07-15' },
                    { estabelecimento: 'Estúdio de Estética Brilho', servico: 'Limpeza de Pele', data: '2025-06-20' }
                ]
            }
        ];
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }
    
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Dados de estabelecimentos e categorias
    const categorias = [
        { id: 1, nome: 'Estética' },
        { id: 2, nome: 'Cílios e Sobrancelha' },
        { id: 3, nome: 'Cabelo e Barba' },
        { id: 4, nome: 'Massoterapia' }
    ];

    const estabelecimentos = [
        {
            id: 1,
            nome: 'Estúdio de Estética Brilho',
            categoriaId: 1,
            imagem: 'https://images.unsplash.com/photo-1558509825-c6511a7e289f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzcGF8ZW58MHx8fHwxNjk5MjI4MDQ4fDA&ixlib=rb-4.0.3&q=80&w=1080',
            endereco: 'Rua da Estética, 123',
            coordenadas: { lat: -8.0583, lng: -34.8813 },
            servicos: [
                { id: 1, nome: 'Limpeza de Pele', duracao: 60, preco: 120.00 },
                { id: 2, nome: 'Massagem Relaxante', duracao: 90, preco: 150.00 }
            ],
            profissionais: [
                { id: 1, nome: 'Juliana Silva', especializacao: 'Esteticista' },
                { id: 2, nome: 'Qualquer um', especializacao: 'Esteticista' }
            ]
        },
        {
            id: 2,
            nome: 'Estúdio de Cílios Glam',
            categoriaId: 2,
            imagem: 'cilios.jpg',
            endereco: 'Avenida dos Cílios, 456',
            coordenadas: { lat: -8.0612, lng: -34.8876 },
            servicos: [
                { id: 3, nome: 'Extensão de Cílios', duracao: 120, preco: 200.00 },
                { id: 4, nome: 'Design de Sobrancelha', duracao: 45, preco: 60.00 }
            ],
            profissionais: [
                { id: 3, nome: 'Fernanda Lima', especializacao: 'Designer de Sobrancelhas' },
                { id: 4, nome: 'Qualquer um', especializacao: 'Designer de Cílios' }
            ]
        },
        {
            id: 3,
            nome: 'Studio Cabelo & Barba',
            categoriaId: 3,
            imagem: 'studiocab.jpg',
            endereco: 'Rua da Barba, 789',
            coordenadas: { lat: -8.0535, lng: -34.8850 },
            servicos: [
                { id: 5, nome: 'Corte de Cabelo', duracao: 30, preco: 50.00 },
                { id: 6, nome: 'Barba Tradicional', duracao: 45, preco: 40.00 }
            ],
            profissionais: [
                { id: 5, nome: 'Barbeiro A', especializacao: 'Cortes Clássicos, Barba' },
                { id: 6, nome: 'Qualquer um', especializacao: 'Todos os tipos de corte' }
            ]
        },
        {
            id: 4,
            nome: 'Massagem & Bem-Estar Zen',
            categoriaId: 4,
            imagem: 'massagem.jpg',
            endereco: 'Praça da Felicidade, 101',
            coordenadas: { lat: -8.0650, lng: -34.8910 },
            servicos: [
                { id: 7, nome: 'Massagem Terapêutica', duracao: 60, preco: 180.00 },
                { id: 8, nome: 'Drenagem Linfática', duracao: 90, preco: 220.00 }
            ],
            profissionais: [
                { id: 7, nome: 'Carlos Mendes', especializacao: 'Massoterapeuta' },
                { id: 8, nome: 'Ana Costa', especializacao: 'Massoterapeuta' }
            ]
        },
        {
            id: 5,
            nome: 'Beleza Renovada',
            categoriaId: 1,
            imagem: 'estetica.jpg',
            endereco: 'Avenida da Moda, 202',
            coordenadas: { lat: -8.0515, lng: -34.8890 },
            servicos: [
                { id: 9, nome: 'Microagulhamento', duracao: 90, preco: 350.00 },
                { id: 10, nome: 'Peeling Químico', duracao: 60, preco: 250.00 }
            ],
            profissionais: [
                { id: 9, nome: 'Mariana Lima', especializacao: 'Esteticista' }
            ]
        },
        {
            id: 6,
            nome: 'Esmalteria Chic',
            categoriaId: 1,
            imagem: 'esmalteria.jpg',
            endereco: 'Rua do Estilo, 303',
            coordenadas: { lat: -8.0592, lng: -34.8888 },
            servicos: [
                { id: 11, nome: 'Manicure e Pedicure', duracao: 60, preco: 60.00 },
                { id: 12, nome: 'Esmaltação em Gel', duracao: 45, preco: 80.00 }
            ],
            profissionais: [
                { id: 10, nome: 'Lucia Santos', especializacao: 'Manicure' }
            ]
        },
        {
            id: 7,
            nome: 'Especialista em Sobrancelhas',
            categoriaId: 2,
            imagem: 'https://images.unsplash.com/photo-1600878170067-17f1f45778a8?q=80&w=1974&auto=format&fit=crop',
            endereco: 'Avenida da Beleza, 404',
            coordenadas: { lat: -8.0520, lng: -34.8780 },
            servicos: [
                { id: 13, nome: 'Micropigmentação', duracao: 150, preco: 450.00 },
                { id: 14, nome: 'Design de Sobrancelha', duracao: 30, preco: 50.00 }
            ],
            profissionais: [
                { id: 11, nome: 'Paula Fernandes', especializacao: 'Micropigmentadora' }
            ]
        },
        {
            id: 8,
            nome: 'Barbearia Vintage',
            categoriaId: 3,
            imagem: 'vintage.jpg',
            endereco: 'Rua das Tesouras, 505',
            coordenadas: { lat: -8.0680, lng: -34.8950 },
            servicos: [
                { id: 15, nome: 'Corte Social', duracao: 30, preco: 45.00 },
                { id: 16, nome: 'Combo Completo', duracao: 60, preco: 80.00 }
            ],
            profissionais: [
                { id: 12, nome: 'João Barbeiro', especializacao: 'Cortes Clássicos' }
            ]
        }
    ];

    const promocoes = [
        { id: 1, nome: '1ª Visita', descricao: '15% de desconto no seu primeiro agendamento.', validade: '31/12/2025' },
        { id: 2, nome: 'Barba de Terça', descricao: '50% de desconto em qualquer serviço de barba.', validade: '31/12/2025' }
    ];
    
    const horariosDisponiveis = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
    const horariosFuncionamento = {
        'Segunda': '09:00 - 18:00',
        'Terça': '09:00 - 18:00',
        'Quarta': '09:00 - 18:00',
        'Quinta': '09:00 - 18:00',
        'Sexta': '09:00 - 18:00',
        'Sábado': '09:00 - 14:00',
        'Domingo': 'Fechado'
    };
    
    // Coordenadas simuladas para o usuário (fallback)
    let userLocation = { lat: -8.0581, lng: -34.8825 }; // Ex: Centro de Recife

    // Função para obter a localização real do usuário
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                initMap();
                renderizarEstabelecimentos(categorias[0].id);
            }, () => {
                showNotification('Não foi possível obter sua localização. Usando localização padrão.', 'error');
                initMap();
                renderizarEstabelecimentos(categorias[0].id);
            });
        } else {
            showNotification('Seu navegador não suporta geolocalização. Usando localização padrão.', 'error');
            initMap();
            renderizarEstabelecimentos(categorias[0].id);
        }
    }


    // Função para calcular a distância entre duas coordenadas (Fórmula de Haversine)
    function calcularDistancia(coords1, coords2) {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // Raio da Terra em km
        const dLat = toRad(coords2.lat - coords1.lat);
        const dLng = toRad(coords2.lng - coords1.lng);
        const lat1 = toRad(coords1.lat);
        const lat2 = toRad(coords2.lat);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        const d = R * c;
        return d.toFixed(1);
    }


    // Elementos do DOM
    const authOverlay = document.getElementById('auth-overlay');
    const loginContainer = document.getElementById('login-container');
    const cadastroContainer = document.getElementById('cadastro-container');
    const linkCadastro = document.getElementById('link-cadastro');
    const linkLogin = document.getElementById('link-login');
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');

    const mainHeader = document.getElementById('main-header');
    const mainContent = document.getElementById('main-content');

    const homeLogoBtn = document.getElementById('home-logo-btn');
    const navCategorias = document.getElementById('nav-categorias');
    
    const profileBtn = document.getElementById('profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const logoutBtnDropdown = document.getElementById('logout-btn-dropdown');

    const tabContents = document.querySelectorAll('.tab-content');
    const estabelecimentosLista = document.getElementById('estabelecimentos-lista');
    const promocoesLista = document.getElementById('promocoes-lista');
    const horariosLista = document.getElementById('horarios-lista');
    const notificationPopup = document.getElementById('notification');

    const modalAgendamento = document.getElementById('modal-agendamento');
    const btnCloseModal = document.querySelector('.close-btn');
    const stepNavs = document.querySelectorAll('.step-nav');
    const btnAvancarStep1 = document.getElementById('btn-avancar-step1');
    const btnVoltarStep2 = document.getElementById('btn-voltar-step2');
    const btnAvancarStep2 = document.getElementById('btn-avancar-step2');
    const btnVoltarStep3 = document.getElementById('btn-voltar-step3');
    const btnConfirmarAgendamento = document.getElementById('btn-confirmar-agendamento');
    const calendarioContainer = document.getElementById('calendario-container');
    const horariosContainer = document.getElementById('horarios-disponiveis');
    const profissionaisLista = document.getElementById('profissionais-lista');
    const modalServicosLista = document.getElementById('modal-servicos-lista');
    
    // Novo elemento para a barra de progresso
    const progressIndicator = document.getElementById('progress-indicator');


    const resumoEstabelecimento = document.getElementById('resumo-estabelecimento');
    const resumoServico = document.getElementById('resumo-servico');
    const resumoProfissional = document.getElementById('resumo-profissional');
    const resumoData = document.getElementById('resumo-data');
    const resumoHora = document.getElementById('resumo-hora');
    const resumoPreco = document.getElementById('resumo-preco');

    let estabelecimentoSelecionado = null;
    let servicoSelecionado = null;
    let dataSelecionada = null;
    let horarioSelecionado = null;
    let profissionalSelecionado = null;
    let clienteAtual = loggedInUser;
    let metodoPagamento = 'estabelecimento';

    // Inicializa o mapa com Leaflet.js
    let map = null;
    function initMap() {
        if (map) map.remove();
        map = L.map('map').setView([userLocation.lat, userLocation.lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([userLocation.lat, userLocation.lng]).addTo(map)
            .bindPopup('Sua Localização Simulada')
            .openPopup();
        
        estabelecimentos.forEach(est => {
            const marker = L.marker([est.coordenadas.lat, est.coordenadas.lng]).addTo(map);
            marker.bindPopup(`<b>${est.nome}</b><br>${est.endereco}`);
        });
    }

    // --- FUNÇÕES DE UTILIDADE ---

    function showNotification(message, type = 'success') {
        notificationPopup.textContent = message;
        notificationPopup.className = `notification-popup show ${type}`;
        anime({
            targets: '#notification',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: 'easeOutQuad'
        });
        setTimeout(() => {
            anime({
                targets: '#notification',
                opacity: [1, 0],
                translateY: [0, 20],
                duration: 500,
                easing: 'easeOutQuad',
                complete: () => {
                    notificationPopup.classList.remove('show');
                }
            });
        }, 3000);
    }
    
    function updateProgressBar(stepNumber) {
        let width = 0;
        if (stepNumber === 1) {
            width = 0;
        } else if (stepNumber === 2) {
            width = 50;
        } else if (stepNumber === 3) {
            width = 100;
        }
        anime({
            targets: progressIndicator,
            width: `${width}%`,
            easing: 'easeInOutQuad',
            duration: 500
        });
    }

    function changeStep(stepNumber) {
        // Animação de saída do conteúdo atual
        anime({
            targets: `.step-content > div.step-active`,
            opacity: [1, 0],
            translateY: [0, 20],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                document.querySelectorAll('.step-nav').forEach(nav => nav.classList.remove('active'));
                document.querySelector(`.step-nav[data-step='${stepNumber}']`).classList.add('active');
                document.querySelectorAll('.step-number.active').forEach(sn => sn.classList.remove('active'));
                document.querySelector(`.step-nav[data-step='${stepNumber}'] .step-number`).classList.add('active');

                document.getElementById('step-1').classList.remove('step-active');
                document.getElementById('step-2').classList.remove('step-active');
                document.getElementById('step-3').classList.remove('step-active');
                document.getElementById(`step-${stepNumber}`).classList.add('step-active');
                
                updateProgressBar(stepNumber);

                // Animação de entrada do novo conteúdo
                anime({
                    targets: `#step-${stepNumber}`,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
    }
    
    function resetAgendamentoState() {
        estabelecimentoSelecionado = null;
        servicoSelecionado = null;
        dataSelecionada = null;
        horarioSelecionado = null;
        profissionalSelecionado = null;
        metodoPagamento = 'estabelecimento';
        document.querySelectorAll('.servico-card').forEach(s => s.classList.remove('selected'));
        document.querySelectorAll('.profissional-card').forEach(p => p.classList.remove('selected'));
        document.querySelectorAll('.dia').forEach(d => d.classList.remove('selected'));
        document.querySelectorAll('.horario').forEach(h => h.classList.remove('selected'));
    }


    // --- FUNÇÕES DE RENDERIZAÇÃO ---

    function renderizarCategorias() {
        navCategorias.innerHTML = '';
        categorias.forEach(categoria => {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-category');
            button.textContent = categoria.nome;
            button.dataset.categoriaId = categoria.id;
            button.addEventListener('click', () => {
                document.querySelectorAll('#nav-categorias .btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderizarEstabelecimentos(categoria.id);
            });
            navCategorias.appendChild(button);
        });
        if (categorias.length > 0) {
            document.querySelector('#nav-categorias .btn').click();
        }
    }
    
    function renderizarEstabelecimentos(categoriaId) {
        estabelecimentosLista.innerHTML = '';
        const estabelecimentosFiltrados = estabelecimentos.filter(e => e.categoriaId === categoriaId);
        
        if (estabelecimentosFiltrados.length === 0) {
            estabelecimentosLista.innerHTML = '<p class="text-center">Nenhum estabelecimento encontrado nesta categoria.</p>';
            return;
        }

        estabelecimentosFiltrados.forEach(estabelecimento => {
            const distancia = calcularDistancia(userLocation, estabelecimento.coordenadas);
            const card = document.createElement('div');
            card.classList.add('estabelecimento-card', 'scroll-animate');
            card.dataset.id = estabelecimento.id;
            card.innerHTML = `
                <img src="${estabelecimento.imagem}" alt="${estabelecimento.nome}">
                <div class="card-details">
                    <div class="card-info">
                        <h3>${estabelecimento.nome}</h3>
                        <p class="address">${estabelecimento.endereco}</p>
                    </div>
                    <div class="card-actions">
                        <p class="distance">${distancia} km de você</p>
                        <button class="btn btn-primary btn-agendar" data-id="${estabelecimento.id}">Agendar</button>
                    </div>
                </div>
            `;
            estabelecimentosLista.appendChild(card);
        });
        animateOnScroll();
    }

    function renderizarServicosAgendamento() {
        if (!estabelecimentoSelecionado || !estabelecimentoSelecionado.servicos) return;
        modalServicosLista.innerHTML = '';
        estabelecimentoSelecionado.servicos.forEach(servico => {
            const card = document.createElement('div');
            card.classList.add('servico-card');
            card.dataset.id = servico.id;
            card.innerHTML = `
                <h3>${servico.nome}</h3>
                <p>Duração: ${servico.duracao} min</p>
                <p class="price">R$ ${servico.preco.toFixed(2)}</p>
            `;
            card.addEventListener('click', () => {
                document.querySelectorAll('#modal-servicos-lista .servico-card').forEach(s => s.classList.remove('selected'));
                card.classList.add('selected');
                servicoSelecionado = servico;
            });
            modalServicosLista.appendChild(card);
        });
    }

    function renderizarProfissionaisAgendamento() {
        profissionaisLista.innerHTML = '';
        if (!estabelecimentoSelecionado || !estabelecimentoSelecionado.profissionais) return;
        estabelecimentoSelecionado.profissionais.forEach(profissional => {
            const card = document.createElement('div');
            card.classList.add('profissional-card');
            card.dataset.id = profissional.id;
            card.textContent = profissional.nome;
            card.addEventListener('click', () => {
                document.querySelectorAll('.profissional-card').forEach(p => p.classList.remove('selected'));
                card.classList.add('selected');
                profissionalSelecionado = profissional;
            });
            profissionaisLista.appendChild(card);
        });
    }

    function renderizarHorariosFuncionamento() {
        horariosLista.innerHTML = '';
        for (const dia in horariosFuncionamento) {
            const li = document.createElement('li');
            const horario = horariosFuncionamento[dia];
            li.innerHTML = `<strong>${dia}:</strong> ${horario}`;
            horariosLista.appendChild(li);
        }
    }
    
    function renderizarPromocoes() {
        promocoesLista.innerHTML = '';
        promocoes.forEach(promocao => {
            const card = document.createElement('div');
            card.classList.add('promocao-card', 'scroll-animate');
            card.innerHTML = `
                <h3>${promocao.nome}</h3>
                <p>${promocao.descricao}</p>
                <p class="price">Válido até: ${promocao.validade}</p>
            `;
            promocoesLista.appendChild(card);
        });
    }

    function renderizarPerfil() {
        if (!clienteAtual) return;
        document.getElementById('cliente-nome').textContent = clienteAtual.nome;
        document.getElementById('cliente-email').textContent = clienteAtual.email;
        document.getElementById('cliente-telefone').textContent = clienteAtual.telefone;
        
        const agendamentosFuturos = document.getElementById('agendamentos-futuros');
        agendamentosFuturos.innerHTML = '';
        clienteAtual.agendamentosFuturos.forEach(agendamento => {
            const li = document.createElement('li');
            li.classList.add('perfil-item');
            li.innerHTML = `
                <div class="info">
                    <strong>${agendamento.servico}</strong>
                    <span>${agendamento.data} às ${agendamento.hora}</span>
                    <span>Local: ${agendamento.estabelecimento}</span>
                </div>
                <button class="btn btn-cancelar" data-id="${agendamento.id}">Cancelar</button>
            `;
            agendamentosFuturos.appendChild(li);
        });

        const historicoCortes = document.getElementById('historico-cortes');
        historicoCortes.innerHTML = '';
        clienteAtual.historicoCortes.forEach(corte => {
            const li = document.createElement('li');
            li.classList.add('perfil-item');
            li.innerHTML = `
                <div class="info">
                    <strong>${corte.servico}</strong>
                    <span>${corte.data}</span>
                    <span>Local: ${corte.estabelecimento}</span>
                </div>
            `;
            historicoCortes.appendChild(li);
        });
    }

    function renderizarCalendario() {
        const hoje = new Date();
        const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        
        calendarioContainer.innerHTML = '';
        diasSemana.forEach(dia => {
            const header = document.createElement('div');
            header.classList.add('dia-header');
            header.textContent = dia;
            calendarioContainer.appendChild(header);
        });

        for (let i = 0; i < 30; i++) {
            const dia = new Date();
            dia.setDate(hoje.getDate() + i);
            const diaElement = document.createElement('div');
            diaElement.classList.add('dia');
            diaElement.textContent = dia.getDate();
            diaElement.dataset.date = dia.toISOString().split('T')[0];
            
            if (dia.getDay() === 0) {
                diaElement.classList.add('inativo');
            } else {
                diaElement.addEventListener('click', () => {
                    document.querySelectorAll('#calendario-container .dia').forEach(d => d.classList.remove('selected'));
                    diaElement.classList.add('selected');
                    dataSelecionada = diaElement.dataset.date;
                    renderizarHorarios();
                });
            }
            calendarioContainer.appendChild(diaElement);
        }
    }

    function renderizarHorarios() {
        horariosContainer.innerHTML = '<h4>Horários Disponíveis</h4>';
        horariosDisponiveis.forEach(hora => {
            const horarioElement = document.createElement('span');
            horarioElement.classList.add('horario');
            horarioElement.textContent = hora;
            horarioElement.addEventListener('click', () => {
                document.querySelectorAll('.horario').forEach(h => h.classList.remove('selected'));
                horarioElement.classList.add('selected');
                horarioSelecionado = hora;
            });
            horariosContainer.appendChild(horarioElement);
        });
    }

    function animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.scroll-animate').forEach(element => {
            element.classList.remove('is-visible');
            observer.observe(element);
        });
    }


    // --- LÓGICA DE AUTENTICAÇÃO ---

    function checkAuth() {
        if (loggedInUser) {
            authOverlay.classList.remove('show');
            mainHeader.style.display = 'flex';
            mainContent.style.display = 'block';
            
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.getElementById('home-tab').classList.add('active');
            
            renderizarCategorias();
            renderizarHorariosFuncionamento();
            animateOnScroll();
            getUserLocation(); // Tenta obter a localização do usuário
        } else {
            authOverlay.classList.add('show');
            mainHeader.style.display = 'none';
            mainContent.style.display = 'none';
        }
    }
    
    // Animação de entrada dos formulários de autenticação
    loginContainer.classList.add('active');
    anime({
        targets: '#login-container',
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;
        
        const user = clientes.find(c => c.email === email && c.senha === senha);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            clienteAtual = user;
            checkAuth();
            showNotification('Login realizado com sucesso!', 'success');
        } else {
            showNotification('E-mail ou senha incorretos.', 'error');
        }
    });

    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('cadastro-nome').value;
        const email = document.getElementById('cadastro-email').value;
        const telefone = document.getElementById('cadastro-telefone').value;
        const senha = document.getElementById('cadastro-senha').value;
        
        if (clientes.some(c => c.email === email)) {
            showNotification('Este e-mail já está em uso.', 'error');
            return;
        }

        const novoCliente = {
            id: Date.now(),
            nome,
            email,
            telefone,
            senha,
            agendamentosFuturos: [],
            historicoCortes: []
        };
        clientes.push(novoCliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        localStorage.setItem('loggedInUser', JSON.stringify(novoCliente));
        clienteAtual = novoCliente;
        checkAuth();
        showNotification('Conta criada com sucesso! Você já está logado.', 'success');
    });

    logoutBtnDropdown.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('loggedInUser');
        clienteAtual = null;
        checkAuth();
        showNotification('Você saiu da sua conta.', 'success');
    });

    linkCadastro.addEventListener('click', (e) => {
        e.preventDefault();
        anime({
            targets: '#login-container',
            opacity: [1, 0],
            scale: [1, 0.9],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                loginContainer.classList.remove('active');
                cadastroContainer.classList.add('active');
                anime({
                    targets: '#cadastro-container',
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
    });

    linkLogin.addEventListener('click', (e) => {
        e.preventDefault();
        anime({
            targets: '#cadastro-container',
            opacity: [1, 0],
            scale: [1, 0.9],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                cadastroContainer.classList.remove('active');
                loginContainer.classList.add('active');
                anime({
                    targets: '#login-container',
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
    });


    // --- LÓGICA DO SITE PRINCIPAL ---
    
    // Toggle do menu de perfil
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
    });

    // Esconder dropdown ao clicar fora
    window.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
             profileDropdown.classList.remove('show');
        }
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
    
    // Navegação do Dropdown
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = e.currentTarget.dataset.tab;
            
            tabContents.forEach(t => t.classList.remove('active'));
            document.getElementById(tab).classList.add('active');
            
            profileDropdown.classList.remove('show');
            if (tab === 'perfil-tab') {
                renderizarPerfil();
            } else if (tab === 'promocoes-tab') {
                renderizarPromocoes();
            } else if (tab === 'home-tab') {
                renderizarCategorias();
                animateOnScroll();
            }
        });
    });

    // Botão de logo para voltar à home
    homeLogoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        tabContents.forEach(t => t.classList.remove('active'));
        document.getElementById('home-tab').classList.add('active');
        renderizarCategorias();
    });

    btnAvancarStep1.addEventListener('click', () => {
        if (!servicoSelecionado || !profissionalSelecionado) {
            showNotification('Selecione um serviço e um profissional para continuar.', 'error');
            return;
        }
        renderizarCalendario();
        changeStep(2);
    });
    
    // Agendar ao clicar no card de estabelecimento (evento delegado)
    document.getElementById('estabelecimentos-lista').addEventListener('click', (e) => {
        const btnAgendar = e.target.closest('.btn-agendar');
        if (btnAgendar) {
            const id = parseInt(btnAgendar.dataset.id);
            estabelecimentoSelecionado = estabelecimentos.find(e => e.id === id);
            renderizarServicosAgendamento();
            renderizarProfissionaisAgendamento();
            modalAgendamento.classList.add('show');
            changeStep(1);
        }
    });

    btnVoltarStep2.addEventListener('click', () => {
        changeStep(1);
    });

    btnAvancarStep2.addEventListener('click', () => {
        if (!dataSelecionada || !horarioSelecionado) {
            showNotification('Selecione uma data e um horário.', 'error');
            return;
        }
        resumoEstabelecimento.textContent = estabelecimentoSelecionado.nome;
        resumoServico.textContent = servicoSelecionado.nome;
        resumoProfissional.textContent = profissionalSelecionado.nome;
        resumoData.textContent = dataSelecionada;
        resumoHora.textContent = horarioSelecionado;
        resumoPreco.textContent = `R$ ${servicoSelecionado.preco.toFixed(2)}`;
        
        changeStep(3);
    });

    btnVoltarStep3.addEventListener('click', () => {
        changeStep(2);
    });

    // Lógica do pagamento
    const paymentOptions = document.querySelector('.payment-options');
    const paymentOnlineSim = document.getElementById('payment-online-sim');
    paymentOptions.addEventListener('change', (e) => {
        metodoPagamento = e.target.value;
        if (metodoPagamento === 'online') {
            paymentOnlineSim.style.display = 'flex';
        } else {
            paymentOnlineSim.style.display = 'none';
        }
    });

    btnConfirmarAgendamento.addEventListener('click', () => {
        const novoAgendamento = {
            id: Date.now(),
            estabelecimento: estabelecimentoSelecionado.nome,
            servico: servicoSelecionado.nome,
            profissional: profissionalSelecionado.nome,
            data: dataSelecionada,
            hora: horarioSelecionado,
            pagamento: metodoPagamento
        };
        
        if (clienteAtual) {
            clienteAtual.agendamentosFuturos.push(novoAgendamento);
            localStorage.setItem('loggedInUser', JSON.stringify(clienteAtual));
        }

        modalAgendamento.classList.remove('show');
        showNotification('Agendamento confirmado com sucesso!', 'success');
        
        resetAgendamentoState();
        renderizarPerfil();
    });

    btnCloseModal.addEventListener('click', () => {
        modalAgendamento.classList.remove('show');
        resetAgendamentoState();
    });

    document.getElementById('perfil-tab').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-cancelar')) {
            const id = parseInt(e.target.dataset.id);
            const agendamentoIndex = clienteAtual.agendamentosFuturos.findIndex(a => a.id === id);
            if (agendamentoIndex > -1) {
                clienteAtual.agendamentosFuturos.splice(agendamentoIndex, 1);
                localStorage.setItem('loggedInUser', JSON.stringify(clienteAtual));
                showNotification('Agendamento cancelado com sucesso.', 'success');
                renderizarPerfil();
            }
        }
    });

    checkAuth();
});