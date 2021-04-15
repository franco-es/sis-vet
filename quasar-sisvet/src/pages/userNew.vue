<template>
  <q-page padding>
    <!-- content -->
    <h1 class=" flex-center  q-pa-md">Registrate</h1>
    <div class="flex-center  q-pa-md " style="max-width: 400px">
      <q-form @submit="register" @reset="onReset" class=" form-complete q-gutter-md">
        <q-input
          filled
          v-model="nombre"
          label="nombre"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          filled
          v-model="telefono"
          label="Número de telefono"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          filled
          v-model="email"
          label="ejemplo@ejemplo.com"
          hint="email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="*********"
          lazy-rules
          :rules="[ val => val.length >= 3 || 'Minimo 8 caracteres']"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      telefono: '',
      email: '',
      password: '',
      accept: false,
    }
  },
  methods: {
    register() {
      console.log("hola, soy onsubmit");
    },
    onReset() {
      console.log("hola, soy onreset");
    }
  }
};
</script>

<style>
.center {
  align-items: center;
  text-align: center;
}
.bd-red{
  border: 1px solid red;
}
.flex-center{
  display: flex ;
  align-items: center;
  justify-content: center;
  margin: auto;
}
.form-complete{
  width: 100vw;
  height: 100vh;
}
</style>
