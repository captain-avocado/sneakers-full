export default function module() { 
    console.log('hello from module');
    console.log('IM GOT U');
    let a = 5, b = 10;
    function hi(a, b) {
        console.log(`${a} + ${b}`);
    }
    hi(a, b);
    console.log($);
}