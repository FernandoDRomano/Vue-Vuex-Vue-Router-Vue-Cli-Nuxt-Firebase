const frutaProgreso = {
    name: 'fruta-progreso',
    template: /* html */ `
    <div>
        <p class="h3 font-weight-bold text-black-50">Limite 10 frutas</p>
        <div class="progress">
            <div 
                class="progress-bar progress-bar-striped progress-bar-animated" 
                :class="fondoColor"
                :style="width"
                role="progressbar" 
                aria-valuenow="75" 
                aria-valuemin="0" 
                aria-valuemax="100">
                    {{progreso}}%
            </div>
        </div>
    </div>
    `,
    props: ['progreso'],
    computed: {
        width(){
            return `width: ${this.progreso}%`
        },
        fondoColor(){
            return{
                'bg-info': this.progreso <= 20,
                'bg-primary': this.progreso > 20 && this.progreso <= 40,
                'bg-success': this.progreso > 40 && this.progreso <= 60,
                'bg-warning': this.progreso > 60 && this.progreso <= 80,
                'bg-danger': this.progreso > 80 && this.progreso <= 100,
            }
        }
    }
}