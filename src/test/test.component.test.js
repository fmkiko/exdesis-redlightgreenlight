
import NavbarComponent from '../components/navbar/navbar.component.js';
import LoginComponent from '../components/login/login.component.js';
import PlayerComponent from '../components/player-screen/player.component.js';

// Test método validator
xdescribe("Test validator de login", ()=>{
    let loginComponent ;
    beforeAll(()=>{
        loginComponent = new LoginComponent();
    })
    it("Develve false en texto vacio", ()=>{
        
        expect( loginComponent, validator("") ).toBeFalsy();
    });
    it("Develve true en texto con character", ()=>{
        
        expect( loginComponent, validator("Fran") ).toBeTrue;
    });
    xit("validator return boolean",()=>{
        const result = loginComponent.validator("FR")
        expect(typeof result ).toBe('boolean')
    })
})

// Check navBar
xdescribe("Nombre palayer", ()=>{
    beforeAll(()=>{
        navBarComponent = new NavbarComponent();
    })
    it("Método getSession debe reurtar salido con nombre enviado", ()=>{
        const nombre = "FR";
        const result = navBarComponent.getSession(nombre);
        expect( result ).toContain( 'Hi ' + nombre);
    })
})


