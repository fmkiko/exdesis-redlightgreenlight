# exdesis-redlightgreenlight

Deploy en server:
1- Descargar e instalar las dependencias.
### En la terminal del proyecto:
    npm install
2- Realiar el build.
### Para generar la carpeta dist 'deploy'
    npm run bild
3- Subir a un servidor el contenido de la carpeta dist.
    ...
### Directorios de la app:
    src -> encontramos
                -> index.html 
                -> components - carpeta donde están los web component
                -> js - encontramos el index.js el el archivo root de la app, el router.component.js
                -> pages - los html
                -> test -los archivos .test.js para las pruebas.
### Explicativo:
    1- index.html tenemos el componente  roter-outlet, es el router de la app:
        
        <body>
            <div class="container">
                <router-outlet></router-outlet>
            </div>
        </body>

    2- En el index.js, importamos los styles y los icons además de hacer el define del componente router:

        import '../styles/style.scss';
        import '../../node_modules/font-awesome/css/font-awesome.min.css';

        import RouterComponent from '../js/router.component.js';
        customElements.define('router-outlet', RouterComponent);

    3- En el componente router, realizamos los define de los componentes hijos:
        
        setChildComponent(){
        if (typeof customElements.get('login-component') === 'undefined') {
            customElements.define('login-component', LoginComponent);
          }
        if (typeof customElements.get('player-component') === 'undefined') {
            customElements.define('player-component', PlayerComponent);
          }
        if (typeof customElements.get('navbar-component') === 'undefined') {
            customElements.define('navbar-component', NavbarComponent);
          }
        }

    En él también tenemos un oyente sobre el resultado del login:

        listenerLogin(){
            if( this.querySelector('login-component')){
                this.querySelector('login-component').addEventListener('status-login', (e)=>{
                    console.log(e.detail);
                    if(e.detail){
                        this.pagesIndex = 2;
                        this.session(e.detail);
                        this.render();
                    }
                })
            }
        }

    El router lo realizamos por index page y change hash:

        getComponentToRender(pagesIndex){
            switch(pagesIndex) {
                case 1:
                return loginPage;
                case 2:
                return playerPage;
                default:
                    return loginPage;
                }
        }

    Change hash:

        handleURL() {
            switch(window.location.hash) {
            case '#login':
                this.pagesIndex = 1;
                break;
            case '#player':
                this.pagesIndex = 2;
                break;
            default:
                this.pagesIndex = 1;
                break;
            }
            this.render()
        }
    
    También abrimos sesión apoyándonos en un servicio StoregeData, clase con métodos estáticos.

        session(data){
            StorgeData.playerName = data.player;
            if(!StorgeData.getPlayer( data.player )){
                StorgeData.saveData({ name : data.player, score: 0})
            }
        }

    4- Tenemos componentes encapsulados con el mode 'open', los cuales renderizan las pages según son llamados por el router.

        LoginComponent, una vez cargado a través del  connectedCallback() , inicializamos y creamos los eventos para el click del button y el focus de input:

        connectedCallback() {
            this.init();
            // Event click btn palayer
            this.playerBtn.addEventListener('click',()=>{
                this.playerName = this.inputName.value.trim();
                this.validator(this.playerName);
            });
            // Event focus input
            this.inputName.addEventListener('focus',()=>{
                this.divError.innerText = "";
            })
        }

        También disponemos de un customEvent para informar a los otros componentes del estado del login:
            
            fireDatosLogin(){
                this.dispatchEvent(new CustomEvent('status-login', {
                    detail: {
                        status: this.isPlayerNameOK,
                        player : this.playerName,
                    }
                }));
            }
        Un validator método para validar el nombre no es vacío, y un método getTampllace() para devolver la plantilla.
        Por otro lado, este componente pude ser configurado en la plantilla donde se usa, a través de slot.
        login.html
            <login-component
                title = "Create New Player"
                btn-name="Join"
                icon ="">
                <div slot="icon" style="color: white">
                    <i style="font-size: 70px;"class="fa fa-user-o" aria-hidden="true"></i>
                </div>
            </login-component> 
        
        NavBarComponent: Encargadod de representar la navegación, solo visible en player.
        Es simple, con el nombre del player y el logout. Sige la misma estructura, que las otras, y 
        se apoya en el servicio para recuperar la sessión.

                getSession(playerName){
                    const sessionObj = StorgeData.getPlayer(playerName);
                    return "Hi " + sessionObj.name;
                }
        
        En el componente player es donde recae la funcionalidad del juego, sigue la misma estructura que los
        componentes anteriores.

    5- Clase  StoregeData.js es una clase con métodos estáticos para realizar el CRUD sobre el localStorage,
       al estar constitida con métodos estáticos no se tiene que instanciar.

