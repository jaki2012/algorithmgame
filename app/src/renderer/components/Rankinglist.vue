<template>
<div>
<h1>算数小能手排行榜</h1>
<template v-for="(user,index) in users">
    <li><p>
        <span id="rank">第{{index+1}}名</span>
        <span id="username">玩家姓名：</span><span style="margin-left:0px;width:80px;display:inline-block">{{user.name}} </span>
        <span id="score">玩家分数：</span>{{user.score}}
    </p></li>
</template>
<div style="margin-top:20px">
<router-link href="#" to="/" class="submit">返回游戏</router-link>
</div>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: mapState({users: state=> state.rankings.users}),
}
</script>

<style scoped>
 li {
     text-align:left;
     list-style: none;
 }

 #rank {
     color:#FF9966;
 }

 #username {
     color:#FF6666;
 }

 #score {
     color:#FF6666;
 }
 p span {
     margin-left:10px;
 }

 .submit {
    margin-top:50px;
    vertical-align: text-top;    
	background-color:#3bb3e0;
	padding:10px;
	position:relative;
	font-family: 'Open Sans', sans-serif;
	font-size:12px;
	text-decoration:none;
	color:#fff;
	border: solid 1px;
	background-image: linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
	background-image: -o-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
	background-image: -moz-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
	background-image: -webkit-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
	background-image: -ms-linear-gradient(bottom, rgb(44,160,202) 0%, rgb(62,184,229) 100%);
	background-image: -webkit-gradient(
	linear,
	left bottom,
	left top,
	color-stop(0, rgb(44,160,202)),
	color-stop(1, rgb(62,184,229))
	);
	-webkit-box-shadow: inset 0px 1px 0px #7fd2f1, 0px 1px 0px #fff;
	-moz-box-shadow: inset 0px 1px 0px #7fd2f1, 0px 1px 0px #fff;
	box-shadow: inset 0px 1px 0px #7fd2f1, 0px 1px 0px #fff;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	-o-border-radius: 5px;
	border-radius: 5px;
}

.submit:active {
	padding-bottom:9px;
	padding-left:10px;
	padding-right:10px;
	padding-top:11px;
	top:1px;
	background-image: linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
	background-image: -o-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
	background-image: -moz-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
	background-image: -webkit-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
	background-image: -ms-linear-gradient(bottom, rgb(62,184,229) 0%, rgb(44,160,202) 100%);
	background-image: -webkit-gradient(
	linear,
	left bottom,
	left top,
	color-stop(0, rgb(62,184,229)),
	color-stop(1, rgb(44,160,202))
	);
}
 
</style>