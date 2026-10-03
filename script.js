const images=["greengreen-1.jpg","greengreen-2.jpg","greengreen-3.jpg"];
let index=0,qty=1,cart=0;

function showImage(i){
  index=(i+images.length)%images.length;
  document.getElementById("productImage").src=images[index];
  document.querySelectorAll(".thumb").forEach((x,n)=>x.classList.toggle("active",n===index));
}
function gallery(n){showImage(index+n)}
function changeQty(n){qty=Math.max(1,qty+n);document.getElementById("qty").textContent=qty}
function addCart(){
  cart+=qty;
  const t=document.getElementById("toast");
  t.textContent=`Đã thêm ${qty} sản phẩm vào giỏ hàng ✓`;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1600);
}
document.querySelectorAll(".chips").forEach(group=>{
  group.querySelectorAll(".chip").forEach(button=>{
    button.addEventListener("click",()=>{
      group.querySelectorAll(".chip").forEach(b=>b.classList.remove("selected"));
      button.classList.add("selected");
    });
  });
});
