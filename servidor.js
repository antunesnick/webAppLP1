import express from 'express';
import session from 'express-session';
import path from 'path';


const app = express();
const porta = 3000;
const host = '0.0.0.0';
const JSON_SERVER_URL = 'http://localhost:3001'; 

app.use(session({
    secret: 'chave-secreta-sistema-gestao',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30, // 30 minutos
        httpOnly: true,
        secure: false
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/publico', express.static('publico'));

function verificarAutenticacao(req, res, next) {
    if (req.session.autenticado) {
        next();
    } else {
        res.redirect('/publico/login.html');
    }
}

app.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;
    
    try {
        const response = await fetch(`${JSON_SERVER_URL}/usuarios?usuario=${usuario}&senha=${senha}`);
        const usuarios = await response.json();
        
        if (usuarios.length > 0) {
            req.session.autenticado = true;
            req.session.usuario = usuario;
            res.redirect('/menu');
        } else {
            res.redirect('/publico/login.html?erro=1');
        }
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        res.redirect('/publico/login.html?erro=2'); 
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/publico/login.html');
});


app.get('/menu', verificarAutenticacao, (req, res) => {
    res.sendFile(path.resolve('privado/menu.html'));
});


app.get('/cadastro/:tipo', verificarAutenticacao, (req, res) => {
    const tipo = req.params.tipo;
    const tiposPermitidos = ['cliente', 'produto', 'fornecedor', 'entregador', 'categoria', 'usuario'];
    
    if (tiposPermitidos.includes(tipo)) {
        res.sendFile(path.resolve(`privado/cadastros/${tipo}.html`));
    } else {
        res.status(404).send('Página não encontrada');
    }
});


app.get('/api/:entidade', async (req, res) => {
    const entidade = req.params.entidade;
    try {
        const response = await fetch(`${JSON_SERVER_URL}/${entidade}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Erro ao buscar ${entidade}:`, error);
        res.status(500).json({ erro: `Erro ao buscar ${entidade}` });
    }
});

app.post('/api/:entidade', async (req, res) => {
    const entidade = req.params.entidade;
    try {
        const response = await fetch(`${JSON_SERVER_URL}/${entidade}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const novoItem = await response.json();
        res.json({ sucesso: true, item: novoItem });
    } catch (error) {
        console.error(`Erro ao criar ${entidade}:`, error);
        res.status(500).json({ erro: `Erro ao criar ${entidade}` });
    }
});

app.put('/api/:entidade/:id', verificarAutenticacao, async (req, res) => {
    const entidade = req.params.entidade;
    const id = req.params.id;
    try {
        const response = await fetch(`${JSON_SERVER_URL}/${entidade}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const itemAtualizado = await response.json();
        res.json({ sucesso: true, item: itemAtualizado });
    } catch (error) {
        console.error(`Erro ao atualizar ${entidade}:`, error);
        res.status(500).json({ erro: `Erro ao atualizar ${entidade}` });
    }
});

app.delete('/api/:entidade/:id', async (req, res) => {
    const entidade = req.params.entidade;
    const id = req.params.id;
    try {
        const response = await fetch(`${JSON_SERVER_URL}/${entidade}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            res.json({ sucesso: true });
        } else {
            res.status(response.status).json({ erro: `Erro ao excluir ${entidade}` });
        }
    } catch (error) {
        console.error(`Erro ao excluir ${entidade}:`, error);
        res.status(500).json({ erro: `Erro ao excluir ${entidade}` });
    }
});

app.get('/', (req, res) => {
    res.redirect('/publico/vitrine.html');
});

app.listen(porta, host, () => {
    console.log("Server rodando em http://localhost:"+porta);
});

