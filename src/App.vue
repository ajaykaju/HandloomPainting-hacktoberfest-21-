<template>
  <v-app v-model="sw">
    <v-app-bar 
    id="appbar"
    dark 
    app 
    color="indigo"
    >
    <v-app-bar-nav-icon
    class="hidden-sm-and-up"
    @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="headline .font-weight-black">Handloom Painting</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items
    class="hidden-xs-only">
    <v-btn router to="/register" color="red" dark>
      <v-icon left>developer_board</v-icon>
      Register No
    </v-btn>
      <v-btn text router :to='item.link' v-for="item in items" :key="item.title">
      <v-icon left>{{item.icon}}</v-icon>
      {{item.title}}
    </v-btn>
    <v-btn text @click="logout" v-if="user">
      <v-icon left>lock</v-icon>
      Logout
    </v-btn>
    </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer
    class="hidden-sm-and-up"
    temporary
    absolute
    floating 
    v-model="drawer"
    clipped
    >
    <v-list flat fixed permenant >
      <v-list-item
      color="red"
      router to="/register"
      >
      <v-list-item-avatar>
        <v-icon>developer_board</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Register No</v-list-item-title>
      </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="item in items" 
      :key="item.title" 
      router :to="item.link" 
      color="info" 
      :ripple="false"
      >
        <v-list-item-avatar>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
      v-if="user"
      color="info" 
      :ripple="false"
      @click="logout"
      >
      <v-list-item-avatar>
        <v-icon>lock</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>
    <v-content class="mb-10">
      <router-view></router-view>
    </v-content>
    <v-footer 
    dark
    padless
  >
  <v-card
  flat
  tile
  width="100%"
  >
    <v-card width="100%" class="teal" tile flat>
      <br>
    </v-card>
    <v-card-actions class="grey darken-3 white--text text-right overline">
          <v-spacer></v-spacer>
      Designed By 
      <v-btn href="https://www.linkedin.com/in/ajay-kodinhi/" target="_blank"  x-small text class="overline">
        Ajay K
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-footer>
  </v-app>
</template>
 
 <script>
 export default{
   data(){
     return{
       drawer:false,
     }
   },
   computed:{
     user(){
       if(this.$store.getters.user != null || this.$store.getters.user != undefined){
         return true
       }
       else{
         return false
       }
     },
     items(){
       var item = []
       if(this.user === true){
         item = [
           {icon:'person',link:'/instructions',title:'Instructions'},
           {icon:'person',link:'/admin',title:'Admin'}
         ]
       }
       else{
          item = [
           {icon:'file_copy',link:'/instructions',title:'Instructions'},
           {icon:'assignment_return',link:'/signin',title:'Sign In'}
         ]
       }
       return item
     },
   },
   methods:{
     logout(){
       this.$store.dispatch('logOut')
     },
     sw(){
       ServiceWorkerRegistration.update()
     }
   }
 }
</script>
