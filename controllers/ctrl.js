console.log("ccontrollers start..");
var mysql = require("mysql");
var pool = mysql.createPool({
    host : 'us-cdbr-iron-east-05.cleardb.net',
    port : '3306',
    user : 'bf475c2956231b',
    password : 'bd3edbc5',
	database : 'heroku_03866a54d3fc614',
	connectionLimit : 10
});


var Tx = require("ethereumjs-tx").Transaction;

var Web3 = require("web3");
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/0f4756f47089425c8be0922bc4fe9040"));

// web3.setProvider(new Web3.providers.HttpProvider("https://kovan-testnet.github.io/website/"));
var proofContract = "0x8a83083215fc1b91d86e4b42c396ba4135f0b0c9";
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
// console.log("confing_start");
// console.log(web3.version);




//메인화면(로그인) 컨트롤러
module.exports.index = function(req, res){
    res.render('index', { 
		title : 'Add review'
	});
};

//사용자 정보 컨트롤러
module.exports.user_info = async function(req, res){
	var key = req.query.key; //내 계좌 주소
	
	// let contract = await new web3.eth.Contract(proofAbi,proofContract);
	let result = await contract.methods.balanceOf(key).call();

	console.log("결과테스트: " , result);
	// var tokenInst = new web3.eth.Contract(proofAbi,proofContract);
	// await tokenInst.methods.balanceOf(key).call().then(function (bal) {
    //     console.log(bal);
	//  });
	
	//==========================이더는 잘 보인다================
	// let result = await web3.eth.getBalance(key); 
	// result = web3.utils.fromWei(result,"ether");
	//==========================================================

    res.render('user_info', { 
		key : key,
		balance : result });
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

//자판기 스캐너
module.exports.get_machine = function(req, res){
	var numvalue = req.query.num;
    res.render('machine', { 
		num : numvalue });
};


//자판기
module.exports.get_vd_machine = function(req, res){
    res.render('vd_machine', { title : 'Add review' });
};

//물품구입
module.exports.get_buy_item = function(req, res){
    res.render('buy_item', { title : 'Add review' });
};

//물품구입 qr
module.exports.item = async function(req, res){
	var numvalue = req.query.num + ";";
	//사용처 주소
	var key = "0xc0d486753068c654041A2B6fB6A5da671eB02B90"
	let result = await contract.methods.balanceOf(key).call();
    res.render('item', { 
		num : numvalue + key,
		balance : result 	
	});
};

module.exports.user_scan = function(req, res) {
	res.render('user_scan', { 
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

//이메일 중복확인 체크

module.exports.emailCheck = function(req,res,next){
 
    var email = req.body.email;

    let query = `select EMAIL from block_table where EMAIL = '${email}';`;
	
	pool.getConnection(function(err, connection) {
		try{
			new Promise((resolve, reject) => {
				connection.query(query, function(err, result, fields) {
					
					let check="0";
	
					if(err){
						console.log(err);
					    connection.release();
						// return reject(err);
	
					}else{ //없는 경우는 [] 값으로 들어감
						if(result.length==0) {
							connection.release();
							return resolve("0");
							
						}else{
	
							console.log(result[0].EMAIL); //이메일 자체 string값 나옴
							var emailCnt = result[0].EMAIL.length;
				
							// console.log("이메일 길이: " + emailCnt);
				
							if(emailCnt != 0){ //이메일 길이가 0이 아니면
								check="1";
								connection.release();
								return resolve(check); //이메일 중복
				
							}else{
								connection.release();
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
	})
    
}

//회원가입 컨트롤러
//사용자가 입력한 EMAIL DB와 비교해서 없으면 생성, 있으면 있다고 반환
module.exports.create = async function(req, res, next){
    var name = req.body.name;
    var email = req.body.email;
    var pwd = req.body.pwd;
    var emailConfirm = req.body.emailConfirm;
	// console.log(emailConfirm);


    if(emailConfirm == 1){ //중복확인 했을 경우만 계정생성

        // var newAccount = await web3.eth.personal.newAccount(pwd,function(err,result) {
        //         console.log("계정생성 중");
                
        // });
		// newAccount = newAccount.toLowerCase();

		//================여기부터 수정해야함(2019-11-12)=====================

		var newAccount  = web3.eth.accounts.create(pwd,function(err,result){
			console.log("계정생성 중");
		});

		var person_Account = newAccount.address; 
		person_Account.toLowerCase();
		console.log("새로 생성된 계정: ", newAccount);
		var pk = newAccount.privateKey;


			

		var count = await web3.eth.getTransactionCount("0x34f6D074736d86F1641161e60F8946c7a3150F50");  


		// console.log("privateKey : " + privateKey);
		// console.log("가스값: " ,web3.eth.getGasPrice());
		var rawTransaction = {
			"from":"0x34f6D074736d86F1641161e60F8946c7a3150F50", //자판기가 컨트랙트에 트랜잭션 요청 require(msg.sender)
			"to":person_Account,
			"gas":215720,
			"gasPrice":web3.utils.toHex(2 * 1e9),
			"value": 50000000000000000,
			"chainId": 42, //토큰 발행
			// "data":contract.methods.transfer(account, amount).encodeABI(),
			"nonce":web3.utils.toHex(count)
		}

		var transaction = new Tx(rawTransaction, {chain:'kovan'});

		var privateKey = new Buffer.from('49f97f5533623812480bf54ca8800b5a3c443958d88b7657e75cbfa9fc80d853','hex'); //kovan 쓰레기통 계정 private key

		transaction.sign(privateKey);	
		
		// console.log("거래싸인: ", transaction);


		var result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
		console.log("결과값: " , result);
		
		

		

	

		pool.getConnection(function(err,connection) {
			if(err) {
				connection.release();
				console.log('err connection');
				throw err;
			}
			let str_query =`INSERT INTO block_table(EMAIL, NAME, PASSWORD,ACCOUNT,PK) VALUES('${email}','${name}','${pwd}','${person_Account}','${pk}');`;
        	connection.query(str_query,function(err, result, fields) {
            if(err) {
				connection.release();
                console.log(err);
            } else {
				connection.release();
                console.log(result);
            }
            
        });

        res.send("confirm");
		});
		//====================================================================
        

    }else{

        res.send("reject");
    }
	
};


//로그인 컨트롤러
module.exports.login = function(req, res, next){
    var email = req.body.email;
	var pwd = req.body.pwd;
	let query = `SELECT EMAIL,PASSWORD,ACCOUNT FROM block_table WHERE EMAIL='${email}';`;
	console.log("테스트4");
	pool.getConnection(function(err,connection) {
		if(err) {
			connection.release();
			console.log('err connection');
			throw err;
		}
		try{
			new Promise((resolve, reject) => {
				connection.query(query, function(err2, rows, fields) {
					
					if(err2){
						connection.release();
						console.log(err2);
					}else if (rows.length > 0) { 
						if(pwd == rows[0].PASSWORD) {
							console.log("테스트1");
							connection.release();
							return resolve(rows[0].ACCOUNT);
						}else{
							console.log("테스트2");
							connection.release();
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
	
		}catch(err2){
		}

	});
	

	
};

//자판기에서 qr코드 읽고 완료버튼누를때 처리하는 로직
module.exports.machine = async function(req, res, next) {
	
	//자판기 계좌 개인키
	var trashAddress = '0x2cb9aEd5bCdC33Fa7ba55AF9e96633972a683705'; //kovan 쓰레기통 계정 주소
	var account = req.body.account; //내 계좌
	var num = req.body.num;//받을 코인 갯수

	var amount = web3.utils.toHex(num) //hex 값으로 변환
	// console.log("어마운트: ",amount);
	

	var count = await web3.eth.getTransactionCount(trashAddress);  


	// console.log("privateKey : " + privateKey);
	// console.log("가스값: " ,web3.eth.getGasPrice());
	var rawTransaction = {
		"from":trashAddress, //자판기가 컨트랙트에 트랜잭션 요청 require(msg.sender)
		"to":contract._address,
		"gas":215720,
		"gasPrice":web3.utils.toHex(2 * 1e9),
		"value":"0x0",
		"chainId": 42,
		"data":contract.methods.mint(account,num).encodeABI(), //토큰 발행
		// "data":contract.methods.transfer(account, amount).encodeABI(),
		"nonce":web3.utils.toHex(count)
	}

	var transaction = new Tx(rawTransaction, {chain:'kovan'});

	var privateKey = new Buffer.from('FA783B8D551E47EDCADDB9A5C4C727A7F2D8C877645F4FA1C5453086B31CC745','hex'); //kovan 쓰레기통 계정 private key

	transaction.sign(privateKey);	
	
	// console.log("거래싸인: ", transaction);


	var result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
	console.log("결과값: " , result);

	contract.methods.balanceOf(account).call().then(function(bal){
		console.log("잔액: ", bal);
	});

	//======================================================================
	// # chainId
    // 0: Olympic, Ethereum public pre-release testnet
    // 1: Frontier, Homestead, Metropolis, the Ethereum public main network
    // 1: Classic, the (un)forked public Ethereum Classic main network, chain ID 61
    // 1: Expanse, an alternative Ethereum implementation, chain ID 2
    // 2: Morden, the public Ethereum testnet, now Ethereum Classic testnet
    // 3: Ropsten, the public cross-client Ethereum testnet
    // 4: Rinkeby, the public Geth PoA testnet
    // 42: Kovan, the public Parity PoA testnet
    // 77: Sokol, the public POA Network testnet
    // 99: Core, the public POA Network main network
    // 7762959: Musicoin, the music blockchain
	//======================================================================================
	res.send("complete");
}




//물품구입할때 qr코드 읽고 차감
module.exports.post_buy_item = async function(req, res,next){
	var account = req.body.account;
	var string_tmp = account.split(';');
	var my_account = req.body.key;
	console.log(string_tmp);
	let query = `SELECT PK FROM block_table WHERE ACCOUNT='${my_account}';`;

	pool.getConnection(function(err,connection) {
		if(err) {
			connection.release();
			console.log('err connection');
			throw err;
		}
		connection.query(query, async function(err2, rows, fields) {
				
			if(err2){
				connection.release();
				console.log(err2);
			
			}else if (rows.length > 0) { 
					//0번째 배열이 가격, 1번배열이 주소
				var saleAddress = string_tmp[1]; //kovan 쓰레기통 계정 주소
				var num = string_tmp[0];//받을 코인 갯수
			
				
				var count = await web3.eth.getTransactionCount(my_account);  
				console.log(rows[0].PK);

				// console.log("privateKey : " + privateKey);
				// console.log("가스값: " ,web3.eth.getGasPrice());
				var rawTransaction = {
					"from":my_account, //자판기가 컨트랙트에 트랜잭션 요청 require(msg.sender)
					"to":contract._address,
					"gas":215720,
					"gasPrice":web3.utils.toHex(2 * 1e9),
					"value":"0x0",
					"chainId": 42,
					"data":contract.methods.transferpay(saleAddress,num).encodeABI(), //토큰 발행
					// "data":contract.methods.transfer(account, amount).encodeABI(),
					"nonce":web3.utils.toHex(count)
				}

				var transaction = new Tx(rawTransaction, {chain:'kovan'});
				var pktmp = rows[0].PK
				var privateKey = new Buffer.from(pktmp.substring(2,pktmp.length),'hex');
				transaction.sign(privateKey);	
				
				// console.log("거래싸인: ", transaction);


				var result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
				console.log("결과값: " , result);

				contract.methods.balanceOf(my_account).call().then(function(bal){
				console.log("잔액: ", bal);
				connection.release();
				res.send("lol");
				});
			} else {
				connection.release();
				console.log("에러가났다" + rows.length);
			}
	
		});
	})

	
			
};