<template>
    <v-container class="text-center">
        <v-layout align-center justify-center class="mt-12" row wrap>
            <v-flex xs12 class="mt-3">
                <v-card outlined>
                    <v-card-text>
                        For students from standard 1 to 4 click the LP button for view and download Register Number
                    </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn x-large tile color="error" dark @click="Lp">LP</v-btn>
                </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs12 class="mt-3">
                <v-card outlined>
                    <v-card-text>
                        For students from standard 5 to 7 click the UP button for view and download Register Number
                    </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn x-large tile color="success" dark @click="Up">UP</v-btn>
                </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs12 class="mt-3">
                <v-card outlined>
                    <v-card-text>
                        For students from standard 8 to 10 click the HS button for view and download Register Number
                    </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn x-large tile color="info" dark  @click="Hs">HS</v-btn>
                </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    data(){
        return{

        }
    },
    methods:{
        Lp(){
            window.open("https://app.box.com/s/7yqzbn6m1483efx58bsxep551jrbzkly","_blank")
        },
        Up(){
            window.open("https://app.box.com/s/y36o64cvg0asgtceh6at3ohxbq72t0d3","_blank")
        },
        Hs(){
            window.open("https://app.box.com/s/czwh4l9jmx1uuly9uj94h0vot8pocy9g","_blank")
        }
    }
}
</script>