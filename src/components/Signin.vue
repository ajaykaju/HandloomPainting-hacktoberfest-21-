<template>
    <v-container>
        <v-layout class="mb-4">
                <v-flex offset-sm4>
                    <h1>Sign In</h1>
                </v-flex>
        </v-layout>
        <v-layout>
            <v-flex offset-sm4 xs12 sm4>
                <v-alert
                dense
                v-if="errorstat"
                type="error"
                >
                {{errormess}}
                </v-alert>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <v-form
                v-model="valid"
                @submit.prevent="onSignin"
                >
                    <v-layout>
                        <v-flex xs12 sm4 offset-sm4>
                            <v-text-field
                            outlined
                            v-model="email"
                            name="email"
                            label="Username"
                            prepend-inner-icon="person"
                            required
                            :rules="[rules.required.username]"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm4 offset-sm4>
                            <v-text-field
                            outlined
                            v-model="password"
                            name="password"
                            label="Password"
                            type="password"
                            prepend-inner-icon="lock"
                            required
                            :rules="[rules.required.password]"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm4 offset-sm4>
                            <v-btn type="submit" :disabled="!valid">Sign In</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data(){
        return{
            errormess:null,
            errorstat:false,
            valid:true,
            alert:'',
            email:'',
            password:'',
            rules:{
                required :{
                    password: v => !!v || "password is required",
                    username: v => !!v || "username is required",
                }
            }
        }
    },
    computed:{
        user(){
            return this.$store.getters.user
        },
        error(){
            if(this.$store.getters.error != null){
                this.errorstat = true
                this.errormess = this.$store.getters.error.message
                window.setTimeout(()=>{
                    this.$store.dispatch('clearError')
                    this.errorstat = false
                    this.errormess = null
                },3000)
            }
        }
    },
    watch:{
        user(value){
            if(value !== null && value !== undefined){
                return this.$router.push('/admin')
            }
        },
        error(){}
    },
    methods:{
        onSignin(){
            this.$store.dispatch('onSignin',{
                email:this.email,
                password:this.password
            })
        },
    }
}
</script>