# 🚪 GET-OUT

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Parcel](https://img.shields.io/badge/Parcel-2.12.0-ff69b4?style=flat&logo=parcel)](https://parceljs.org/)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange)](https://github.com/your-username/get-out)

> Um jogo de horror psicológico e sobrevivência onde você deve guiar uma família ucraniana através de eventos sobrenaturais enquanto mantém sua sanidade mental.

## 📖 Sobre o Projeto

**GET-OUT** é uma experiência narrativa imersiva que combina elementos de horror psicológico com mecânicas de sobrevivência. Você controla uma família de quatro pessoas (Dmytro, Olena, Mykola e Sofiia) que deve enfrentar eventos sobrenaturais e tomar decisões críticas que afetam a sanidade mental de cada membro.

### 🎮 Características Principais

- **Sistema de Sanidade Mental**: Cada personagem possui um nível de sanidade que pode aumentar ou diminuir baseado nas suas escolhas
- **Eventos Dinâmicos**: Encontros únicos que testam a coragem e determinação da família
- **Sistema de Dados**: Rolagens para determinar sucessos/falhas nas ações
- **Condições Psicológicas**: Personagens podem desenvolver afecções como ansiedade, paranoia, trauma e depressão
- **Múltiplos Idiomas**: Suporte para português brasileiro e inglês
- **Interface Responsiva**: Design adaptável para diferentes dispositivos

## 🎯 Personagens

| Personagem | Descrição | Atributos |
|------------|-----------|-----------|
| **Dmytro** | O protagonista (você) | Força, Labia, Furtividade, Exploração |
| **Olena** | A esposa | Sanidade, Intuição, Resistência |
| **Mykola** | O filho | Coragem, Inocência, Adaptabilidade |
| **Sofiia** | A filha | Esperança, Sensibilidade, Perseverança |

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, TypeScript
- **Bundler**: [Parcel](https://parceljs.org/) v2.12.0
- **Estrutura**: Arquitetura modular com managers e entities
- **Localização**: Sistema de internacionalização (i18n)
- **Áudio**: Suporte para arquivos MP3 e WAV

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/your-username/get-out.git
   cd get-out
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npx parcel index.html --port 3000
   ```

4. **Acesse o jogo**
   Abra seu navegador e vá para `http://localhost:3000`

## 🎮 Como Jogar

### Mecânicas Básicas

1. **Navegação**: Use os botões para navegar entre as páginas do jogo
2. **Eventos**: Enfrente situações que testam a sanidade da família
3. **Escolhas**: Tome decisões que afetam o bem-estar psicológico dos personagens
4. **Rolagens**: Algumas ações requerem rolagem de dados para determinar o resultado
5. **Progressão**: Continue caminhando para avançar na história

### Sistema de Sanidade

- **Ganhar Sanidade**: +5% a +10% baseado nas escolhas
- **Perder Sanidade**: -5% a -15% baseado nas consequências
- **Afecções**: Condições psicológicas que afetam o desempenho

### Tipos de Eventos

- **Enfrentar**: Confrontar diretamente o perigo
- **Evitar**: Tentar escapar da situação
- **Esperança**: Manter otimismo diante da adversidade
- **Cautela**: Agir com cuidado e precaução

## 🌍 Internacionalização

O jogo suporta múltiplos idiomas através do sistema de localização:

- 🇧🇷 **Português Brasileiro** (padrão)
- 🇺🇸 **Inglês**

Os arquivos de tradução estão localizados em `src/localization/`.

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Mantenha o código limpo e bem documentado
- Siga as convenções de nomenclatura existentes
- Teste suas mudanças antes de submeter
- Atualize a documentação quando necessário

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- Inspirado em jogos de horror psicológico e narrativas interativas
- Comunidade de desenvolvedores de jogos independentes
- Contribuidores e testadores

## 📞 Contato

- **Projeto**: [GET-OUT](https://github.com/your-username/get-out)
- **Issues**: [GitHub Issues](https://github.com/your-username/get-out/issues)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!