// timers phase five
setTimeout(() => {
    console.log("Print Fifth");
}, 500);

// timers phase three
setTimeout(() => {
    console.log("Print Third");
}, 0);

// timers phase two
process.nextTick(() => {
    console.log("Print Second");
});


// timers phase one
console.log("Print First");

// timers phase four
setTimeout(() => {
    console.log("Print Forth");
}, 400);

// Before Exit
process.on('beforeExit', () => {
    console.log('left as is.');
});
