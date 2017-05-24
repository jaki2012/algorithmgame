<template>
<div>
<div v-if="!nameSet">
    <p id="question">请输入你的游戏ID：</p>
    <input type="text" id="answer" v-model="playerName"></input>
    <a href="#" class="submit" v-on:click="startGame">开始游戏！</a>
</div>
<div v-if="nameSet">
    <h1>当前分数：{{currentScore}}</h1>
    <p id="question">如果<span id="equation">{{question}}</span>，那么x的值是？</p>
    <input type="text" id="answer" v-model="input"></input>
    <a v-if="answering && !finished" href="#" class="submit" v-on:click="checkAnswer">提交答案</a>
    <a v-if="!answering && !finished" href="#" class="submit" v-on:click="nextLevel">下一关</a>
    <router-link v-if="finished" href="#" class="submit" to="/rankinglist">查看排行榜</router-link>
    <a v-if="finished" href="#" class="submit" v-on:click="restart">重新开始</a>
    <p id="alert">{{alert}}</p>
</div>
</div>
</template>

<script>
//import users from '../vuex/modules/rankings'
import { mapActions,mapState } from 'vuex'
export default {
    data: function (){
        return {
            // 系数
            ratio:0,
            // 一次项
            constant:0,
            // 未知数
            unknown:0,
            // 等式右侧结果
            result:0,
            // 用户输入
            input:'',
            // 问题
            question: '',
            // 当前闯关数
            currentScore:0,
            // 回答提示
            alert: '请输入答案',
            // 正在回答
            answering: true,
            // 游戏是否结束
            finished: false,
            // 游戏ID
            playerName: '',
            // 是否已经开始游戏
            nameSet: false
        }
    },
    computed: mapState({users: state => state.rankings.users}),
    created: function() {
        console.log(this.users)
        this.setQuestion();
    },
    methods: {
        ...mapActions(["addRecord"]),
        startGame: function() {
            this.nameSet = true;
            console.log(this.playerName)
        },
        setQuestion: function() {
            this.radio = Math.floor(Math.random()*(20-0)+ 0)
            while(this.radio == 0) {
                this.radio = Math.floor(Math.random()*(20-0)+ 0)
            }
            this.constant = Math.floor(Math.random()*(20-0)+ 0)
            this.unknown = Math.floor(Math.random()*(20-0)+ 0)
            var symbol = Math.floor(Math.random()*(20-0)+ 0)%2 == 0? '+' :'-'
            var position = Math.floor(Math.random()*(20-0)+ 0)%2 == 0? true : false
            console.log(this.radio+"|"+this.constant+"|"+this.unknown+"|"+symbol)
            var symbolRadio = symbol == '+' ? 1 : -1
            //position 为true则一次项在前
            if(position) {
                this.result = this.unknown * this.radio + symbolRadio * this.constant
                this.question = '' + this.radio + 'x' + symbol + this.constant + '=' + this.result
            } else {
                this.result = this.constant + symbolRadio * this.unknown * this.radio  
                this.question = this.constant + symbol + this.radio + 'x' + '=' + this.result
            }
        },
        checkAnswer: function() {
            if(this.input) {
                if(!isNaN(this.input)){
                    if(this.input == this.unknown) {
                        this.alert = "回答正确，点击确认进入下一关"
                        this.currentScore++
                        this.answering = false
                    } else {
                        this.alert = "回答错误，正确答案应为：" + this.unknown
                        var user = {
                            name: this.playerName,
                            score: this.currentScore
                        }
                        this.addRecord(user)
                        console.log(this.users)
                        this.finished = true
                    }
                } else {
                   this.alert = "你输入的不是数字，请重新输入"
                }
            } else{
                this.alert = "你还没有输入任何内容"
            }
        },
        nextLevel: function() {
            this.answering = true
            this.alert = "请输入答案"
            this.setQuestion()
        },
        restart: function() {
            this.finished = false
            this.currentScore = 0
            this.alert = "请输入答案"
            this.setQuestion()
            this.nameSet = false
        },
        compare: function(obj1,obj2) {
            var val1 = obj1.score;
            var val2 = obj2.score;
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            } 
        }
    }
}
</script>

<style>
.submit {
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
#question {
    margin-bottom: 20px;
}

#equation {
    color: red!important;
}

#answer {
    width:130px;
    text-align: right;
    font-family: 'Lato';
    font-size:20px;
    line-height: 30px;
}

#alert {
    margin-top: 10px;
}

</style>