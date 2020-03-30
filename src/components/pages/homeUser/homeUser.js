import React, {Component} from 'react';
import './homeUser.css';
import api from '../../../services/api'
import { Link } from 'react-router-dom'
import { logout } from '../../../services/auth'
import Compras from '../compras/compras'

export default class Home extends Component {
    state = {
        restaurantes: [],
        search: '',
        id_establishment: ''
    }

    Logout() {
        logout ();
        
    }

    componentDidMount () {
        api.get('/findProductOrRestaurante/'+ this.state.search)
                .then(res => {
                    const restaurantes = res.data;
                    this.setState( { restaurantes } );
                
                }).catch((err) => {
                    console.log(err)
         });
    }
    
    handle = async e => {
        console.log(e.target.name, e.target.value)
        await this.setState({[ e.target.name] : e.target.value})
    }

    handleChange = async e => {
        var search = e.target.value
        await this.setState({ search: search })

        api.get('/findProductOrRestaurante/' + this.state.search)
            .then(res => {
                const restaurantes = res.data;
                this.setState( { restaurantes } );
            
            }).catch((err) => {
                console.log(err)
        });
    }
    
  render () {
    return (
      <div className="HomeUser">
          <h1>Home cliente</h1>
          <div className="naveHomeUser">
                <div className="container-search">
                    <input className='search' id="Search" onChange={this.handleChange} type="search" placeholder="Pesquisa restaurante/prato"></input>
                    <img src={require("../../../assets/search.png")} width="29" height="29" alt="search"></img>
                    <Link to="/" className="button-logout">
                        <button onClick={this.Logout}>Logout</button>
                    </Link>
                </div>
          </div>
          
          <div className="grid-container">
            <div className="containerCategorias">
                <div className="categorias">    
                    
                    <ul className="ulCategorias">
                        <h5>Categorias</h5>
                        <li><a href="teste">Mais pedidos</a></li>
                        <li><a href="teste">Promoções</a></li>
                        <li><a href="teste">Entrega grátis</a></li>
                        <li><a href="teste">Restaurante popular</a></li>
                        <li><a href="teste">Entrega rápida</a></li>
                    </ul>
                    
                </div>
            </div>
            {/* cards */}
            <div className="cardsRestaurantes">
                <h3>Restaurantes</h3>
                <br></br>
                { 
                    this.state.restaurantes.map (restaurantes => (
                    <div key={restaurantes.id_establishment} className = "container-cards-restaurantes">
                        
                        <div className="cards">
                            <h5>Restaurante: {restaurantes.name_estab}</h5>
                            <p>Cidade: {restaurantes.city}</p>
                            {restaurantes.delivery_free ? (<p>Frete grátis!</p>) : (<p>Preço do frete: R$ 2,00</p>)}
                            <p></p>
                            <button name="id_establishment" type="submit" onClick={ this.handle } value={ restaurantes.id_establishment } className="btn btn-primary" >  Ver mais </button>
                            
                        </div>
                    </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                    ))
                }

            </div>
            
            
          </div>
          
          <Compras id="Compras" id_establishment={this.state.id_establishment}/>
      </div>
    );
  }
}