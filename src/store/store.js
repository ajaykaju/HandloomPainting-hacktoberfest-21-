import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import jspdf from 'jspdf'
import app1 from 'raw-loader!./app1.txt'
import app2 from 'raw-loader!./app2.txt'

import XLSX from 'xlsx'
import { saveAs } from 'filesaver.js-npm'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadDetails:[],
    onregload:false,
    onregsucc:false,
    user:null,
    error:null,
  },
  mutations: {
    loadDetails( state,payload ){
      state.loadDetails = payload
    },
    onRegLoad( state,payload ){
      state.onregload = payload
    },
    onRegSucc( state,payload ){
      state.onregsucc = payload
    },
    setUser(state,payload){
      state.user=payload
    },
    error(state,payload){
      state.error = payload
    },
  },
  actions: {
    onRegister( {commit,getters},payload ){
        commit('onRegLoad',true)
          var std = payload.clas
          let cat 
          let color
          if( std >=1 && std <=4 ){
            cat = 'LP'
            color = 'error'
          } 
          if( std >=5 && std <=7 ){
            cat = 'UP'
            color = 'success'
          }
          if( std >=8 && std <=10 ){
            cat = 'HS'
            color = 'info'
          }
          if(std<10){
            std='0'+std
          }
            const insert = {
              name:payload.name,
              dob:payload.dob,
              age:payload.age,
              gender:payload.gender,
              clas:std,
              guardian:payload.guardian,
              gaddress:payload.gaddress,
              mobno:payload.mobno,
              schname:payload.schname,
              saddress:payload.saddress,
              smobno:payload.smobno,
              category:cat,
              color:color,
              regdate:getters.now
            }
          return firebase.database().ref('students').push(insert)
          .then((data)=>{
            return firebase.database().ref('students').child(data.key).update({key:data.key})
          })
          .then((data)=>{
          commit('onRegLoad',false)
          commit('onRegSucc',true)
          return data
          })
          .then(data =>{

            var doc = new jspdf()

            doc.addImage(app1, 0, 0, 210, 0)
            doc.setFontSize(12)
            doc.text(payload.name.toString().toUpperCase(),120,78)
            doc.setFontSize(8)
            doc.text(payload.guardian.toString().toUpperCase(),120,87)
            var split = doc.splitTextToSize(payload.gaddress.toString().toUpperCase(),79)
            doc.text(split,120,91)
            doc.text("Ph: "+payload.mobno.toString().toUpperCase(),170,101)
            doc.setFontSize(12)
            doc.text(payload.dob.toString().toUpperCase(),120,110)
            doc.text("Age : "+payload.age.toString().toUpperCase(),170,110)
            doc.text(payload.gender.toString(),120,122)
            doc.setFontSize(8)
            doc.text(payload.schname.toString().toUpperCase(),120,130)
            var split = doc.splitTextToSize(payload.saddress.toString().toUpperCase(),79)
            doc.text(split,120,135)
            doc.text("Ph: "+payload.smobno.toString(),170,150)
            doc.setFontSize(12)
            doc.text(std,120,160)
            doc.addPage()
            doc.addImage(app2,0,0,210,0)
            doc.save(payload.name+'.pdf')
          })
          .catch(error =>{
          console.log(error)
          })
    },
    setUnsucc( {commit}){
      commit('onRegSucc',false)
    },
    loadDetails( {commit} ){
      firebase.database().ref('students').once('value')
      .then(data =>{
        const loadDetails = []
        const obj = data.val()
        for(let key in obj){
          loadDetails.push({
            id:obj[key].key,
            name:obj[key].name,
            dob:obj[key].dob,
            age:obj[key].age,
            gender:obj[key].gender,
            clas:obj[key].clas,
            guardian:obj[key].guardian,
            gaddress:obj[key].gaddress,
            mobno:obj[key].mobno,
            schname:obj[key].schname,
            saddress:obj[key].saddress,
            smobno:obj[key].smobno,
            category:obj[key].category,
            color:obj[key].color,
            regdate:obj[key].regdate
          })
        }
        commit('loadDetails',loadDetails)
      })
    },
    onSignin( {commit},payload ){
      firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
      .then((user)=>{
        commit('setUser',{id:user.uid})
      })
      .catch((error)=>{
        commit('error',error)
      })
    },
    logOut( {commit} ){
      commit('setUser',null)
    },
    clearError( {commit} ){
      commit('error',null)
      console.log('hai')
    },
    removeItem( {commit},payload ){
      firebase.database().ref('students').child(payload).remove()
      .then(data =>{
      })
      .catch(error =>{
        console.log(error)
      })
    },
    exportTableToExcel({commit},payload){
      var tableID =payload
      var wb = XLSX.utils.book_new()
      var wscols = [
        {wch:10},
        {wch:20},
        {wch:14},
        {wch:10},
        {wch:10},
        {wch:10},
        {wch:20},
        {wch:40},
        {wch:15},
        {wch:20},
        {wch:40},
        {wch:15},
        {wch:10},
        {wch:30},
      ]
      wb.Props = {
          Title: "Student Details",
          Subject: "Handloom Painting Contest",
          Author: "www.handloompaintingkkd.ml",
          CreatedDate: new Date()
      }

      var tToJson =[]
      tToJson.push([
          'S.NO','NAME','DOB','AGE','GENDER','CLASS',
          'GUARDIAN','GUARDIAN ADDRESS','MOBILE NUMBER',
          'SCHOOL NAME','SCHOOL ADDRESS','School M/L Number',
          'CATEGORY','REG.DATE&TIME',
      ],[''])
      
        function getTableData(id){
        var t_rows = document.getElementById(id).querySelectorAll('tbody tr')  
        var t_data = []  
        var ix = 0 
  
        for(var i=0; i<t_rows.length; i++) {
        var row_tds = t_rows[i].querySelectorAll('td')
        if(row_tds.length > 0) {
        t_data[ix] = []
        for(var i2=0; i2<row_tds.length; i2++) t_data[ix].push((row_tds[i2].innerText || row_tds[i2].textContent))
        ix++
          }
        }
        return t_data
      }
      function s2ab(s){
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i=0; i<s.length; i++) {view[i] = s.charCodeAt(i) & 0xFF}
        return buf
      }


      getTableData(tableID).forEach(element => {
          tToJson.push(element)
      })

      wb.SheetNames.push("Student Details")
      var ws = XLSX.utils.aoa_to_sheet(tToJson)
      ws['!cols']=wscols
      wb.Sheets['Student Details'] = ws
      var wbout = XLSX.write(wb,{bookType:'xlsx',type:'binary'})
      saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'exportedStudents.xlsx')

    },
    
  },
  getters:{
    loadDetails(state){
      return state.loadDetails
    },
    onRegLoad(state){
      return state.onregload
    },
    onRegSucc(state){
      return state.onregsucc
    },
    user(state){
      return state.user
    },
    error(state){
      return state.error
    },
    now(){
      var now = new Date()
      now.setHours(now.getHours())
      var isPM = now.getHours() >= 12
      var isMidday = now.getHours() == 12
      var time = [now.getHours() - (isPM && !isMidday ? 12 : 0), 
      now.getMinutes(), 
      now.getSeconds() || '00'].join(':') +(isPM ? ' pm' : ' am')
      const dates = new Date().toDateString()+" "+time
      return dates
    },
    
  }
})
