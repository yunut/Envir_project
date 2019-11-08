console.log("ccontrollers start..");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '1111',
    database : 'mydb'
});

connection.connect();

var Web3 = require("web3");
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var proofContract = "0x43f3c8e1cda12e1c29db90c66f7f68e4eb9cf3d1";
var proofAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "add_user",
				"type": "address"
			}
		],
		"name": "add_admin",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_add_trash",
				"type": "address"
			}
		],
		"name": "add_trash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_receive",
				"type": "address"
			},
			{
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "sender",
				"type": "address"
			},
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_transfer",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferpay",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "admin",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "payback",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "trash",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
var contract = new web3.eth.Contract(proofAbi,proofContract);
console.log("confing_start");
console.log(web3.version);




//메인화면(로그인) 컨트롤러
module.exports.index = function(req, res){
    res.render('index', { 
		title : 'Add review'
	});
};

//사용자 정보 컨트롤러
module.exports.user_info = function(req, res){
    res.render('user_info', { title : 'Location info' });
};

//코인사용하는 컨트롤러
module.exports.use_coin = function(req, res){
    res.render('use_coin', { title : 'Add review' });
};


//건드릴거없음
//회원가입 하는 폼 가져오는 컨트롤러
module.exports.create_form = function(req, res){
    res.render('user_create', { title : 'Add review' });
};

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

//이메일 중복확인 체크

module.exports.emailCheck = function(req,res,next){
 
    var email = req.body.email;

    let query = `select EMAIL from block_table where EMAIL = '${email}';`;
    
    try{

        new Promise((resolve, reject) => {
            connection.query(query, function(err, result, fields) {
                
                let check="0";

                if(err){
                    console.log(err);
                   
                    // return reject(err);

                }else{ //없는 경우는 [] 값으로 들어감
                    if(result.length==0) {
                        return resolve("0");
                    }else{

                        console.log(result[0].EMAIL); //이메일 자체 string값 나옴
                        var emailCnt = result[0].EMAIL.length;
            
                        // console.log("이메일 길이: " + emailCnt);
            
                        if(emailCnt != 0){ //이메일 길이가 0이 아니면
                            check="1";
                            return resolve(check); //이메일 중복
            
                        }else{
                            
                            return resolve(check); //이메일 중복이 아닐 경우
                            
                        }
                    
                    }
                }
        
            });
        }).then(function(result){
            res.json({ //보낼때 status 사용해야되기 때문에 json 형태로 전송
                status: 200,
                response: result
            });                
        });

    }catch(err){
        console.log(err);
    }
}

//회원가입 컨트롤러
//사용자가 입력한 EMAIL DB와 비교해서 없으면 생성, 있으면 있다고 반환
module.exports.create = async function(req, res, next){
    var name = req.body.name;
    var email = req.body.email;
    var pwd = req.body.pwd;
    var emailConfirm = req.body.emailConfirm;
	console.log(emailConfirm);


    if(emailConfirm == 1){ //중복확인 했을 경우만 계정생성

        var newAccount = await web3.eth.personal.newAccount(pwd,function(err,result) {
                console.log("계정생성 중");
                
        });

        
        let str_query =`INSERT INTO block_table(EMAIL, NAME, PASSWORD,ACCOUNT) VALUES('${email}','${name}','${pwd}','${newAccount}');`;
        connection.query(str_query,function(err, result, fields) {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
            }
            
        });

        res.send("confirm");

    }else{

        res.send("reject");
    }
	
};


//로그인 컨트롤러
module.exports.login = function(req, res, next){
    var email = req.body.email;
    var pwd = req.body.pwd;


	let query = `SELECT EMAIL,PASSWORD FROM block_table WHERE EMAIL='${email}';`;

	try{
		new Promise((resolve, reject) => {
			connection.query(query, function(err, rows, fields) {
				
				if(err){
					console.log(err);
				
		

				}else if (rows.length > 0) { 
					if(pwd == rows[0].PASSWORD) {
						return resolve("1");
					}else{
						return resolve("0");
					}
				}
		
			});
		}).then(function(result){
			res.json({ //보낼때 status 사용해야되기 때문에 json 형태로 전송
				status: 200,
				response: result
			});                
		});

	}catch(err){
	}
};