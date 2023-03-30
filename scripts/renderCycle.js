export function renderCycle(cb) {
    const idRef = {
      id: 0,
    };
  
    const tick = function () {
      idRef.id = requestAnimationFrame(function () {
        cb();
  
        tick();
      });
    };
  
    tick();
  
    return () => cancelAnimationFrame(idRef.id);
  }