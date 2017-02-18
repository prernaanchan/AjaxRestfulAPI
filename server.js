var express= require('express');
var app=express();
var bodyParser=require('body-parser');

var products=[
    {
        id:1,
        name: 'Prerna'
    },
    {
        id:2,
        name:'Shraddha'
    }
];
var currentId=2;

var PORT=process.env.PORT ||3000;
app.use(express.static(__dirname));
app.use(bodyParser.json());

//GET Command
app.get('/products',function(req,res){
    res.send({ products:products });
});

//POST Command
app.post('/products', function(req,res){
    var productName=req.body.name;
    currentId++;
    products.push({
        id:currentId,
        name:productName
    });
    res.send("Successfully created!");
});

//PUT Command
app.put('/products/:id', function(req,res){
    var id = req.params.id;
    var newName=req.body.newName;

    var found= false;
    products.forEach(function(product,index){
        if(!found && product.id=== Number(id)){
            product.name=newName;
        }
    });
    res.send("Successfully Updated");
});

//DELETE Command
app.delete('/products/:id', function(req,res){
    var id= req.params.id;
    var found=false;

    products.forEach(function(product,index){
        if(!found && product.id=== Number(id)){
            products.splice(index, 1);
    }
    });
    res.send("Successfully Deleted");
});

//Listen to PORT
app.listen(PORT,function(){
    console.log("Listening to Port " +PORT);

});