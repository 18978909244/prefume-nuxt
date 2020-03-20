var iconList = document.querySelectorAll('.icon-gouwuche1');
for (var i = 0; i < iconList.length; i++) {
  ((i)=>{setTimeout(()=>{
    iconList[i].click()
  },i*500)})(i)
}