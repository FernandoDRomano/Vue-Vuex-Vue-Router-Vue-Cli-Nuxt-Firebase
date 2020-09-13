<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <h4 class="text-center font-weight-bold py-3">Agregar Tarea</h4>
            <form class="formulario">
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" placeholder="Ingresar el nombre de la tarea" class="form-control">
                </div>
                <div class="form-group">
                    <label for="descripcion">Descripción</label>
                    <textarea name="descripcion" id="descripcion" cols="30" rows="5" class="form-control" placeholder="Ingrese una descripción...."></textarea>
                </div>
                <div class="form-group">
                    <input type="submit" value="Guardar Tarea" class="btn btn-primary btn-block">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AgregarTarea'
}
</script>

<style lang="scss" scoped>
    .formulario{
        border: 1px solid rgb(223, 223, 223);
        border-radius: 2rem;
        padding: 1.5rem 2rem;
        margin-bottom: 2rem;
    }
</style>