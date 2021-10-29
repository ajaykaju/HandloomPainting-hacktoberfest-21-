<template>
       <v-container>
           <v-layout class="mb-2">
               <v-flex offset-sm4>
                   <h1>Register</h1>
               </v-flex>
           </v-layout >
           <v-layout>
               <v-flex xs12>
                   <v-form 
                   ref="freg"
                   v-model="valid"
                   @submit.prevent="register"
                   >
                       <v-layout>
                           <v-flex xs12 sm4 offset-sm4>
                               <v-chip
                               class="mb-1"
                               label
                               color="success"
                               >Student details  :
                               </v-chip>
                               <v-text-field 
                               label="Name"
                               v-model="name"
                               id="name"
                               :rules="[rules.required]"
                               required
                               clearable
                               outlined
                               ></v-text-field>
                           </v-flex>
                       </v-layout>
                       <v-layout>
                           <v-flex xs12 sm4 offset-sm4>
                               <v-menu
                               ref="menu"
                               v-model="menu"
                               open-on-click
                               full-width
                               close-on-click
                               :close-on-content-click="false"
                               min-width="290px"
                               offset-y
                               >
                               <template v-slot:activator="{ on }">
                               <v-text-field 
                               label="Date Of Birth"
                               id="dob"
                               v-model="dob"
                               :rules="[rules.required]"
                               required
                               clearable
                               outlined
                               prepend-inner-icon="event"
                               v-on="on"
                               readonly
                               ></v-text-field>
                               </template>
                               <v-date-picker
                               ref="dob"
                               v-model="dob"
                               :max="new Date().toISOString().substr(0, 10)"
                               min="1980-01-01"
                               @change="save"
                               ></v-date-picker>
                               </v-menu>
                           </v-flex>
                       </v-layout>
                       <v-layout>
                           <v-flex xs12 sm4 offset-sm4>
                               <v-text-field 
                               label="Age"
                               id="age"
                               v-model="age"
                               :rules="[rules.required,rules.number,rules.age]"
                               required
                               clearable
                               outlined
                               ></v-text-field>
                           </v-flex>
                       </v-layout>
                       <v-layout>
                           <v-flex xs12 sm4 offset-sm4>
                               Gender : 
                               <v-input>
                               <v-radio-group
                               row
                               id="gender"
                               v-model="gender"
                               :rules="[rules.required]"
                               required
                               >
                               <v-radio label="Male" value="Male"></v-radio>
                               <v-radio label="Female" value="Female"></v-radio>
                               </v-radio-group>
                               </v-input>
                           </v-flex>
                       </v-layout>
                       <v-layout>
                           <v-flex xs12 sm4 offset-sm4>
                               <v-select
                               label="Class"
                               v-model="clas"
                               :items="classes"
                               outlined
                               required
                               :rules="[rules.required]"
                               clearable
                               ></v-select>
                           </v-flex>
                       </v-layout>
                       <v-layout>
                           <v-flex xs12 sm4 offset-sm4>
                               <v-chip
                               class="mb-1"
                               label
                               color="info"
                               >Parent/Guardian details :
                               </v-chip>
                               <v-text-field 
                               label="Name of parent/guardian"
                               id="guardian"
                               v-model="guardian"
                               :rules="[rules.required]"
                               required
                               clearable
                               outlined
                               ></v-text-field>
                           </v-flex>
                       </v-layout>
                       <v-layout>
                           <v-flex xs12 sm4 offset-sm4>
                               <v-text-field 
                               label="Address"
                               id="gaddress"
                               v-model="gaddress"
                               :rules="[rules.required]"
                               required
                               clearable
                               outlined
                               ></v-text-field>
                           </v-flex>
                       </v-layout>
                       <v-layout mb-4>
                           <v-flex xs12 sm4 offset-sm4>
                               <v-input
                               :error="msgerror"
                               :messages="msgmob"
                               >
                               <vue-phone-number-input
                               :error="msgerror"
                               default-country-code="IN"
                               @input="message"
                               ref='mobi'
                               v-model="mobno"
                               required
                               clearable
                               ></vue-phone-number-input>
                               </v-input>
                           </v-flex>
                       </v-layout>
                       <v-layout>
                           <v-flex xs12 sm4 offset-sm4>
                               <v-chip
                               class="mb-1"
                               label
                               color="warning"
                               >School details  :
                               </v-chip>
                               <v-text-field 
                               label="Name of School"
                               v-model="schname"
                               id="schname"
                               :rules="[rules.required]"
                               required
                               clearable
                               outlined
                               ></v-text-field>
                           </v-flex>
                       </v-layout>
                       <v-layout>
                           <v-flex xs12 sm4 offset-sm4>
                               <v-text-field 
                               label="Address"
                               id="saddress"
                               v-model="saddress"
                               :rules="[rules.required]"
                               required
                               clearable
                               outlined
                               ></v-text-field>
                           </v-flex>
                       </v-layout>
                       <v-layout mb-4>
                           <v-flex xs12 sm4 offset-sm4>
                               <v-input
                               :error="smsgerror"
                               :messages="smsgmob"
                               >
                               <vue-phone-number-input
                               :error="smsgerror"
                               default-country-code="IN"
                               @input="smessage"
                               ref='smobi'
                               v-model="smobno"
                               required
                               clearable
                               ></vue-phone-number-input>
                               </v-input>
                           </v-flex>
                       </v-layout>
                       <v-layout>
                           <v-flex offset-sm4>
                               <v-btn :loading="onregload" :disabled="!valid" type="submit">Register</v-btn>
                           </v-flex>
                       </v-layout>
                   </v-form>
                   <v-snackbar top :value="regstat" color="success">
                   <v-flex :value="onregsucc">
                   <v-alert
                   transition="scale-transition"
                   dark
                   color="success"
                   class="text-center"
                   >
                   <v-icon left>check_circle</v-icon>
                   {{alertmsg}}
                   </v-alert>
                   </v-flex>
                   </v-snackbar>
               </v-flex>
           </v-layout>
       </v-container>
</template>


<script>

export default {
    data(){
        return{
            name:'',dob:'',age:'',gender:'',
            gaddress:'',guardian:'',
            saddress:'',schname:'',
            regstat:false,
            alertmsg:'You have successfully registered',
            msgerror:false,
            msgmob:'',
            smsgerror:false,
            smsgmob:'',
            valid:true,
            rollno:'',
            clas: '',
            division:'',
            mobno:'',
            smobno:'',
            menu:false,
            classes:[1,2,3,4,5,6,7,8,9,10],
            rules:{
                required:  v => !!v || 'Field is required',
                number:  v => !isNaN(v) || 'Enter valid number',
                age: v => ( v<=100 && v>0) || 'Enter a valid age',
            }
        }
    },
    computed:{
        onregsucc(){
            if(this.$store.getters.onRegSucc){
                this.regstat = true
                window.setTimeout(()=>{
                    this.$refs.freg.reset()
                    this.mobno=undefined
                    this.smobno=undefined
                },500)
                window.setTimeout(()=>{
                    this.$store.dispatch('setUnsucc')
                    this.regstat = false
                },2500)
            }
        },
        mobvalid(){
                    return this.$refs.mobi.isValid
        },
        smobvalid(){
                    return this.$refs.smobi.isValid
        },
        onregload(){
            return this.$store.getters.onRegLoad
        },
        message(){
            document.addEventListener('input',()=>{
                if(this.mobvalid){
                    this.msgmob = ''
                    this.msgerror = false
                }
                if(!this.mobvalid){
                    this.msgmob = 'Check the Number'
                    this.msgerror = true
                }
            })
        },
        smessage(){
            document.addEventListener('input',()=>{
                if(this.smobvalid){
                    this.smsgmob = ''
                    this.smsgerror = false
                }
                if(!this.smobvalid){
                    this.smsgmob = 'Check the Number'
                    this.smsgerror = true
                }
            })
        },
    },
    watch:{
        menu(val){
            setTimeout(()=>{this.$refs.dob.activePicker = 'YEAR'})
        },
    },
    methods:{
        register(){
            if(!this.valid){
                return                                                                                              
            }
           if(!this.mobvalid || this.mobno == '' || this.mobno == undefined){
                this.msgerror=true
                this.msgmob = 'Check the Number'
                return
           }
           if(!this.smobvalid || this.smobno == '' || this.smobno == undefined){
                this.smsgerror=true
                this.smsgmob = 'Check the Number'
                return
           }
            this.$store.dispatch('onRegister',{
                name:this.name,
                mname:this.mname,
                dob:this.dob,
                age:this.age,
                gender:this.gender,
                clas:this.clas,
                guardian:this.guardian,
                gaddress:this.gaddress,
                mobno:this.$refs.mobi.phoneFormatted,
                schname:this.schname,
                saddress:this.saddress,
                smobno:this.$refs.smobi.phoneFormatted.slice(3,),
            })
        },
        save(date){

                this.$refs.menu.save(date)
        }
    }
}
</script>
