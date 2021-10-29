<template>
        <v-layout :value="user" class="ml-4 mr-4" >
            <v-dialog 
            v-model="deleteDialog"
            max-width="290"
            persistent
            >
            <v-flex>
                <v-card>
                    <v-card-title class="subtitle-2 error--text ">
                       <v-alert dense type="error" :value="true"> Are you sure to remove !!!</v-alert>
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="info" @click="deleteDialog = false" text>Cancel</v-btn>
                        <v-btn color="green darken-1" @click="deleteItem" text>Remove</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            </v-dialog>
            <v-dialog v-model="instruction">
                    <v-flex>
                    <img width="100%" 
                    src="../assets/ins.png" 
                >
                </v-flex>
            </v-dialog>
            <v-flex>
                <v-layout>
                                <v-chip
                                class="mt-3 mb-2"
                                label
                                outlined
                                >Registered Student Details
                                </v-chip>
                                <v-spacer></v-spacer>
                                <v-btn text x-small class="mt-5 mr-3" @click="instruction = true"><h6>instruction</h6></v-btn>
                                <v-btn icon @click="exportTo('dTable')" small class="mt-2">
                                    <v-icon >screen_share</v-icon>
                                </v-btn>
                                
                </v-layout>
                <v-card id="dataTa">
                <v-card-title>
                    <v-flex>
                        <v-chip
                        class="mb-4 mr-2"
                        dark
                        label
                        >
                        Total Students : {{items.tot}}
                        </v-chip>
                        <v-chip
                        class="mb-4 mr-2"
                        dark
                        color="error"
                        label
                        >
                        LP : {{items.lp}}
                        </v-chip>
                        <v-chip
                        class="mb-4 mr-2"
                        dark
                        color="success"
                        label
                        >
                        UP : {{items.up}}
                        </v-chip>
                        <v-chip
                        class="mb-4 mr-2"
                        dark
                        color="info"
                        label
                        >
                        HS : {{items.hs}}
                        </v-chip>
                        </v-flex>
                        <v-spacer></v-spacer>
                    <v-flex>
                    <v-text-field
                    append-icon="search"
                    label="Search"
                    single-line
                    outlined
                    v-model="search"
                    ></v-text-field>
                    </v-flex>
                </v-card-title>
                <v-data-table
                id="dTable"
                :loading="loading"
                :headers="headers"
                :items="items"
                :search="search"
                :disable-sort="sortValue"
                :hide-default-footer="footerValue"
                >
                <template v-slot:item.category="{ item }">
                    <v-chip :color="item.color" dark>{{item.category}}</v-chip>
                </template>
                <template v-slot:item.sno="{ item }" >
                    {{++items.temp}}
                </template>
                
                <template v-slot:item.action="{ item }" v-if="!sortValue">   
                    <v-btn @click="deleteFunc(item.id)" icon small >
                        <v-icon small>delete</v-icon>
                    </v-btn>
                </template>

                </v-data-table>
                </v-card>
            </v-flex>
            <v-overlay :value="exOverlay" class="text-xs-center" opacity="0.8" color="grey darken-4">
               <v-container>
                   <v-row
                   class="fill-height"
                   align-content="center"
                   justify="center"
                   >
                       <v-col cols="12" class="text-center">
                        Exporting the document
                       </v-col>
                       <v-col cols="12">
                           <v-progress-linear
                           indeterminate
                           rounded
                           color="white"
                           height="10"
                           >
                           </v-progress-linear>
                       </v-col>
                   </v-row>
               </v-container>
            </v-overlay>
        </v-layout>
</template>

<script>

export default {
    data(){
        return{
            dId:'',
            deleteDialog:false,
            instruction:false,
            const:null,
            search:'',
            sortValue:false,
            footerValue:false,
            exOverlay:false,
            headers:[
                {text:'S.No',value:'sno'},
                {text:'Name',value:'name'},
                {text:'DOB',value:'dob'},
                {text:'Age',value:'age'},
                {text:'Gender',value:'gender'},
                {text:'Class',value:'clas'},
                {text:'Guardian',value:'guardian'},
                {text:'Guardian Address',value:'gaddress'},
                {text:'Mobile Number',value:'mobno'},
                {text:'School',value:'schname'},
                {text:'School Address',value:'saddress'},
                {text:'School Mobile/Landline Number',value:'smobno'},
                {text:'Category',value:'category'},
                {text:'Reg.Date&Time',value:'regdate'},
                {text:'Action',value:'action',sortable:false}
            ]
        }
    },
    computed:{
        items(){
            var tot=null
            var lp =null
            var up =null
            var hs =null
            var item = []
            this.loadDetails.forEach((element) => {
                if(element.category == 'LP') lp++
                if(element.category == 'UP') up++
                if(element.category == 'HS') hs++
                tot++
                item.push({
                    id:element.id,
                    sno:null,
                    name:element.name,
                    dob:element.dob,
                    age:element.age,
                    gender:element.gender,
                    clas:element.clas,
                    guardian:element.guardian,
                    gaddress:element.gaddress,
                    mobno:element.mobno,
                    schname:element.schname,
                    saddress:element.saddress,
                    smobno:element.smobno,
                    category:element.category,
                    color:element.color,
                    regdate:element.regdate
                })
            })
                item.tot=tot
                item.lp=lp
                item.up=up
                item.hs=hs
                item.temp=null

            return item
        },
        loadDetails(){
            this.$store.dispatch('loadDetails')
            return this.$store.getters.loadDetails
        },
        loading(){
           if(this.items == ''){
               return true
           }
        },
        user(){
            if(this.$store.getters.user == null || this.$store.getters.user == undefined){
            return this.$router.push('/signin')
      }
        }
    },
    methods:{
        deleteFunc(id){
            this.deleteDialog = true
            this.dId = id
        },
        deleteItem(){
            this.$store.dispatch('removeItem',this.dId)
            this.deleteDialog = false
            this.dId = ''
        },
        exportTo(tableID){
            
            this.exOverlay=true
            this.sortValue=true
            this.footerValue=true
            setTimeout(()=>{
                this.$store.dispatch('exportTableToExcel',tableID)
                setTimeout(()=>{ 
                    this.sortValue=false
                    this.footerValue=false
                    this.exOverlay=false
                },1)
            },3000)
            
        },
        
    }
}
</script>
