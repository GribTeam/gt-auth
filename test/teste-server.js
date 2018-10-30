let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp)

describe('Teste login básico', function(){
    it('Acesso a tela de login', function(){
        chai.request('http://localhost:27017/')
        .get('/')
        .end((err,res) => {
            res.should.have.status(200)   
        })        
    });
    
    it('Tentativa de acesso com login e senha', function(){
        chai.request('http://localhost:27017/')
        .get('/vi/auth/local')        
        .end((err,res) => {
            res.should.have.status(401)
        })        
    });
})