const pagination = 100;

let productQueryArray = [];


let getProductQueryArray = function(){
    return  productQueryArray;
};
let setProductQueryArray = function(arr){
    productQueryArray = arr;
}; 



module.exports = {
    pagination: pagination,
    productQueryArray: productQueryArray,
    getProductQueryArray: getProductQueryArray,
	setProductQueryArray: setProductQueryArray,
};