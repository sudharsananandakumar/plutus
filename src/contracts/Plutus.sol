pragma solidity ^0.5.0;

contract Plutus {
    uint public productCount = 0;
    mapping(uint => PlutusNFT) public nfts;

    struct PlutusNFT {
        uint nftidentifier;
        string nftname;
        uint loanamount;
        address payable nftowner;
        bool nftonloan;
        uint tenure;
        uint rate;
        uint monthlyintrest;
    }

    event PlutusNFTCreated(uint nftidentifier,string nftname,uint loanamount,address nftowner,bool nftonloan,uint tenure, uint rate, uint monthlyintrest);

    event PlutusNFTLoaned(uint nftidentifier,string nftname,uint loanamount,address nftowner,bool nftonloan,uint tenure, uint rate, uint monthlyintrest);

    constructor() public{
    }

    function createPlutusNFT(string memory _name, uint _price) public {
        require(bytes(_name).length > 0);
        require(_price > 0);
        productCount ++;
        nfts[productCount] = PlutusNFT(productCount, _name, _price, msg.sender, false, 180 days, 12, ((_price/12)*100)/12);
        emit PlutusNFTCreated(productCount, _name, _price, msg.sender, false, 180 days, 12, ((_price/12)*100)/12);
    }

    function loanNFTProduct(uint _id) public payable {
        PlutusNFT memory _nftproduct = nfts[_id];
        address payable _nftOwner = _nftproduct.nftowner;
        require(_nftproduct.nftidentifier > 0 && _nftproduct.nftidentifier <= productCount);
        require(msg.value >= _nftproduct.loanamount);
        require(!_nftproduct.nftonloan);
        require(_nftOwner != msg.sender );
        require(_nftproduct.rate > 1);
        require(_nftproduct.tenure > 30 days);
        _nftproduct.nftowner = msg.sender;
        _nftproduct.nftonloan = true;
        nfts[_id] = _nftproduct;
        address(_nftOwner).transfer(msg.value);
        emit PlutusNFTLoaned(productCount, _nftproduct.nftname, _nftproduct.loanamount, msg.sender, true,_nftproduct.tenure, _nftproduct.rate, _nftproduct.monthlyintrest);
    }
}