var pidusage = require('pidusage');
require('things-js/lib/core/Code').bootstrap(module, function(Σ){ Σ.setExtractor(function(){ return [{}, {COUNT:COUNT,EXPECTED_QUEUE_COUNT:EXPECTED_QUEUE_COUNT,EXPECTED_HOLD_COUNT:EXPECTED_HOLD_COUNT,ID_IDLE:ID_IDLE,ID_WORKER:ID_WORKER,ID_HANDLER_A:ID_HANDLER_A,ID_HANDLER_B:ID_HANDLER_B,ID_DEVICE_A:ID_DEVICE_A,ID_DEVICE_B:ID_DEVICE_B,NUMBER_OF_IDS:NUMBER_OF_IDS,KIND_DEVICE:KIND_DEVICE,KIND_WORK:KIND_WORK,STATE_RUNNING:STATE_RUNNING,STATE_RUNNABLE:STATE_RUNNABLE,STATE_SUSPENDED:STATE_SUSPENDED,STATE_HELD:STATE_HELD,STATE_SUSPENDED_RUNNABLE:STATE_SUSPENDED_RUNNABLE,STATE_NOT_HELD:STATE_NOT_HELD,DATA_SIZE:DATA_SIZE,performance:performance,BM_RunFunc:BM_RunFunc,BM_SetupFunc:BM_SetupFunc,BM_TearDownFunc:BM_TearDownFunc,BM_RMS:BM_RMS,BM_Iterations:BM_Iterations,BM_Min_Iterations:BM_Min_Iterations,BM_Results:BM_Results}] }).hoist(runRichards, Σ).hoist(Scheduler, Σ).hoist(TaskControlBlock, Σ).hoist(IdleTask, Σ).hoist(DeviceTask, Σ).hoist(WorkerTask, Σ).hoist(HandlerTask, Σ).hoist(Packet, Σ).hoist(BM_Start, Σ);function runRichards() {
        var Σ_runRichards = new Σ.Scope(this, Σ, runRichards, function () {
            return [
                {},
                {
                    scheduler: scheduler,
                    queue: queue
                }
            ];
        });
        var scheduler = new Scheduler();
        scheduler.addIdleTask(ID_IDLE, 0, null, COUNT);
        var queue = new Packet(null, ID_WORKER, KIND_WORK);
        queue = new Packet(queue, ID_WORKER, KIND_WORK);
        scheduler.addWorkerTask(ID_WORKER, 1000, queue);
        queue = new Packet(null, ID_DEVICE_A, KIND_DEVICE);
        queue = new Packet(queue, ID_DEVICE_A, KIND_DEVICE);
        queue = new Packet(queue, ID_DEVICE_A, KIND_DEVICE);
        scheduler.addHandlerTask(ID_HANDLER_A, 2000, queue);
        queue = new Packet(null, ID_DEVICE_B, KIND_DEVICE);
        queue = new Packet(queue, ID_DEVICE_B, KIND_DEVICE);
        queue = new Packet(queue, ID_DEVICE_B, KIND_DEVICE);
        scheduler.addHandlerTask(ID_HANDLER_B, 3000, queue);
        scheduler.addDeviceTask(ID_DEVICE_A, 4000, null);
        scheduler.addDeviceTask(ID_DEVICE_B, 5000, null);
        scheduler.schedule();
        if (scheduler.queueCount != EXPECTED_QUEUE_COUNT || scheduler.holdCount != EXPECTED_HOLD_COUNT) {
            var msg = 'Error during execution: queueCount = ' + scheduler.queueCount + ', holdCount = ' + scheduler.holdCount + '.';
            throw new Error(msg);
        }
    };function Scheduler() {
        this.queueCount = 0;
        this.holdCount = 0;
        this.blocks = new Array(NUMBER_OF_IDS);
        this.list = null;
        this.currentTcb = null;
        this.currentId = null;
    };function TaskControlBlock(link, id, priority, queue, task) {
        var Σ_TaskControlBlock = new Σ.Scope(this, Σ, TaskControlBlock, function () {
            return [
                {
                    link: link,
                    id: id,
                    priority: priority,
                    queue: queue,
                    task: task
                },
                {}
            ];
        });
        this.link = link;
        this.id = id;
        this.priority = priority;
        this.queue = queue;
        this.task = task;
        if (queue == null) {
            this.state = STATE_SUSPENDED;
        } else {
            this.state = STATE_SUSPENDED_RUNNABLE;
        }
    };function IdleTask(scheduler, v1, count) {
        var Σ_IdleTask = new Σ.Scope(this, Σ, IdleTask, function () {
            return [
                {
                    scheduler: scheduler,
                    v1: v1,
                    count: count
                },
                {}
            ];
        });
        this.scheduler = scheduler;
        this.v1 = v1;
        this.count = count;
    };function DeviceTask(scheduler) {
        var Σ_DeviceTask = new Σ.Scope(this, Σ, DeviceTask, function () {
            return [
                { scheduler: scheduler },
                {}
            ];
        });
        this.scheduler = scheduler;
        this.v1 = null;
    };function WorkerTask(scheduler, v1, v2) {
        var Σ_WorkerTask = new Σ.Scope(this, Σ, WorkerTask, function () {
            return [
                {
                    scheduler: scheduler,
                    v1: v1,
                    v2: v2
                },
                {}
            ];
        });
        this.scheduler = scheduler;
        this.v1 = v1;
        this.v2 = v2;
    };function HandlerTask(scheduler) {
        var Σ_HandlerTask = new Σ.Scope(this, Σ, HandlerTask, function () {
            return [
                { scheduler: scheduler },
                {}
            ];
        });
        this.scheduler = scheduler;
        this.v1 = null;
        this.v2 = null;
    };function Packet(link, id, kind) {
        var Σ_Packet = new Σ.Scope(this, Σ, Packet, function () {
            return [
                {
                    link: link,
                    id: id,
                    kind: kind
                },
                {}
            ];
        });
        this.link = link;
        this.id = id;
        this.kind = kind;
        this.a1 = 0;
        this.a2 = new Array(DATA_SIZE);
    };function BM_Start() {
        var Σ_BM_Start = new Σ.Scope(this, Σ, BM_Start, function () {
            return [
                {},
                {
                    data: data,
                    elapsed: elapsed,
                    start: start,
                    end: end,
                    i: i
                }
            ];
        }).hoist(doRun, Σ_BM_Start);
        var data = {
            runs: 0,
            elapsed: 0
        };
        var elapsed = 0;
        var start = Date.now();
        var end = null;
        var i = 0;
        function doRun() {
            var Σ_BM_Start_doRun = new Σ.Scope(this, Σ_BM_Start, doRun, function () {
                return [
                    {},
                    {}
                ];
            });
            BM_SetupFunc();
            Σ.console.log('Iteration : ' + i);
            BM_RunFunc();
            elapsed = Date.now() - start;
            BM_TearDownFunc();
            i++;
            if (i < BM_Iterations) {
                if (i === BM_Iterations / 2 + 1){
                    (function report(){
                        pidusage(process.pid, function(err, stat) {
                            process.send({
                                timestamp: Date.now(),
                                memory: process.memoryUsage(),
                                cpu: stat.cpu
                            })
                        });
                        setTimeout(report, Math.round(Math.random()*200 + 100));
                    })();
                }
                Σ.setImmediate(doRun);
            } else {
                if (data != null) {
                    data.runs += i;
                    data.elapsed += elapsed;
                }
                Σ.console.log('Runs: ' + data.runs + '\t|\tElapsed: ' + data.elapsed);
                end = Date.now();
                Σ.console.log('Total time : ' + (end - start) + ' ms');
                var usec = data.elapsed * 1000 / data.runs;
                var rms = BM_RMS ? BM_RMS() : 0;
                BM_Results.push({
                    time: usec,
                    latency: rms
                });
                process.exit();
            }
        }
        Σ.setImmediate(doRun);
    };Σ.addFunction(function α9up5(id, priority, queue, count) {
        var Σ_α9up5 = new Σ.Scope(this, Σ, α9up5, function () {
            return [
                {
                    id: id,
                    priority: priority,
                    queue: queue,
                    count: count
                },
                {}
            ];
        });
        this.addRunningTask(id, priority, queue, new IdleTask(this, 1, count));
    }, Σ, "α9up5-WGQ7mr0I");Σ.addFunction(function αgPAQ(id, priority, queue) {
        var Σ_αgPAQ = new Σ.Scope(this, Σ, αgPAQ, function () {
            return [
                {
                    id: id,
                    priority: priority,
                    queue: queue
                },
                {}
            ];
        });
        this.addTask(id, priority, queue, new WorkerTask(this, ID_HANDLER_A, 0));
    }, Σ, "αgPAQ-tnP3jKzi");Σ.addFunction(function αPYFu(id, priority, queue) {
        var Σ_αPYFu = new Σ.Scope(this, Σ, αPYFu, function () {
            return [
                {
                    id: id,
                    priority: priority,
                    queue: queue
                },
                {}
            ];
        });
        this.addTask(id, priority, queue, new HandlerTask(this));
    }, Σ, "αPYFu-ZmT7igqY");Σ.addFunction(function α5SJn(id, priority, queue) {
        var Σ_α5SJn = new Σ.Scope(this, Σ, α5SJn, function () {
            return [
                {
                    id: id,
                    priority: priority,
                    queue: queue
                },
                {}
            ];
        });
        this.addTask(id, priority, queue, new DeviceTask(this));
    }, Σ, "α5SJn-fBhc2VbI");Σ.addFunction(function αEmM7(id, priority, queue, task) {
        var Σ_αEmM7 = new Σ.Scope(this, Σ, αEmM7, function () {
            return [
                {
                    id: id,
                    priority: priority,
                    queue: queue,
                    task: task
                },
                {}
            ];
        });
        this.addTask(id, priority, queue, task);
        this.currentTcb.setRunning();
    }, Σ, "αEmM7-S3Hn5tLQ");Σ.addFunction(function αBJCS(id, priority, queue, task) {
        var Σ_αBJCS = new Σ.Scope(this, Σ, αBJCS, function () {
            return [
                {
                    id: id,
                    priority: priority,
                    queue: queue,
                    task: task
                },
                {}
            ];
        });
        this.currentTcb = new TaskControlBlock(this.list, id, priority, queue, task);
        this.list = this.currentTcb;
        this.blocks[id] = this.currentTcb;
    }, Σ, "αBJCS-ziRn1Rdv");Σ.addFunction(function αIwcN() {
        this.currentTcb = this.list;
        while (this.currentTcb != null) {
            if (this.currentTcb.isHeldOrSuspended()) {
                this.currentTcb = this.currentTcb.link;
            } else {
                this.currentId = this.currentTcb.id;
                this.currentTcb = this.currentTcb.run();
            }
        }
    }, Σ, "αIwcN-ESUkqO9w");Σ.addFunction(function αq3Dc(id) {
        var Σ_αq3Dc = new Σ.Scope(this, Σ, αq3Dc, function () {
            return [
                { id: id },
                { tcb: tcb }
            ];
        });
        var tcb = this.blocks[id];
        if (tcb == null) {
            return tcb;
        }
        tcb.markAsNotHeld();
        if (tcb.priority > this.currentTcb.priority) {
            return tcb;
        } else {
            return this.currentTcb;
        }
    }, Σ, "αq3Dc-NSEPcrTk");Σ.addFunction(function αp3KH() {
        this.holdCount++;
        this.currentTcb.markAsHeld();
        return this.currentTcb.link;
    }, Σ, "αp3KH-WCbknrFH");Σ.addFunction(function α633I() {
        this.currentTcb.markAsSuspended();
        return this.currentTcb;
    }, Σ, "α633I-rMA6XwoQ");Σ.addFunction(function αJyHp(packet) {
        var Σ_αJyHp = new Σ.Scope(this, Σ, αJyHp, function () {
            return [
                { packet: packet },
                { t: t }
            ];
        });
        var t = this.blocks[packet.id];
        if (t == null) {
            return t;
        }
        this.queueCount++;
        packet.link = null;
        packet.id = this.currentId;
        return t.checkPriorityAdd(this.currentTcb, packet);
    }, Σ, "αJyHp-7hAfUlcz");Σ.addFunction(function αFqpR() {
        this.state = STATE_RUNNING;
    }, Σ, "αFqpR-WYiP0CL2");Σ.addFunction(function αRnlv() {
        this.state = this.state & STATE_NOT_HELD;
    }, Σ, "αRnlv-HKSd0qPp");Σ.addFunction(function αjSwN() {
        this.state = this.state | STATE_HELD;
    }, Σ, "αjSwN-fSGbg8n6");Σ.addFunction(function αbOFW() {
        return (this.state & STATE_HELD) != 0 || this.state == STATE_SUSPENDED;
    }, Σ, "αbOFW-2kkLJzqQ");Σ.addFunction(function αuJOh() {
        this.state = this.state | STATE_SUSPENDED;
    }, Σ, "αuJOh-TAxXoCJL");Σ.addFunction(function α1U3z() {
        this.state = this.state | STATE_RUNNABLE;
    }, Σ, "α1U3z-Gjw7eaOX");Σ.addFunction(function αXvUu() {
        var Σ_αXvUu = new Σ.Scope(this, Σ, αXvUu, function () {
            return [
                {},
                { packet: packet }
            ];
        });
        var packet;
        if (this.state == STATE_SUSPENDED_RUNNABLE) {
            packet = this.queue;
            this.queue = packet.link;
            if (this.queue == null) {
                this.state = STATE_RUNNING;
            } else {
                this.state = STATE_RUNNABLE;
            }
        } else {
            packet = null;
        }
        return this.task.run(packet);
    }, Σ, "αXvUu-zgqGVEJZ");Σ.addFunction(function α0syV(task, packet) {
        var Σ_α0syV = new Σ.Scope(this, Σ, α0syV, function () {
            return [
                {
                    task: task,
                    packet: packet
                },
                {}
            ];
        });
        if (this.queue == null) {
            this.queue = packet;
            this.markAsRunnable();
            if (this.priority > task.priority) {
                return this;
            }
        } else {
            this.queue = packet.addTo(this.queue);
        }
        return task;
    }, Σ, "α0syV-HQpuzPSA");Σ.addFunction(function αCl9a() {
        return 'tcb { ' + this.task + '@' + this.state + ' }';
    }, Σ, "αCl9a-96uuWXk6");Σ.addFunction(function αUbuh(packet) {
        var Σ_αUbuh = new Σ.Scope(this, Σ, αUbuh, function () {
            return [
                { packet: packet },
                {}
            ];
        });
        this.count--;
        if (this.count == 0) {
            return this.scheduler.holdCurrent();
        }
        if ((this.v1 & 1) == 0) {
            this.v1 = this.v1 >> 1;
            return this.scheduler.release(ID_DEVICE_A);
        } else {
            this.v1 = this.v1 >> 1 ^ 53256;
            return this.scheduler.release(ID_DEVICE_B);
        }
    }, Σ, "αUbuh-IVX3ZyCV");Σ.addFunction(function αwZld() {
        return 'IdleTask';
    }, Σ, "αwZld-LObDjo9i");Σ.addFunction(function α4RIU(packet) {
        var Σ_α4RIU = new Σ.Scope(this, Σ, α4RIU, function () {
            return [
                { packet: packet },
                {}
            ];
        });
        if (packet == null) {
            if (this.v1 == null) {
                return this.scheduler.suspendCurrent();
            }
            var v = this.v1;
            this.v1 = null;
            return this.scheduler.queue(v);
        } else {
            this.v1 = packet;
            return this.scheduler.holdCurrent();
        }
    }, Σ, "α4RIU-jbyzZwrU");Σ.addFunction(function αUE3M() {
        return 'DeviceTask';
    }, Σ, "αUE3M-1E1LtSpD");Σ.addFunction(function αLULd(packet) {
        var Σ_αLULd = new Σ.Scope(this, Σ, αLULd, function () {
            return [
                { packet: packet },
                {}
            ];
        });
        if (packet == null) {
            return this.scheduler.suspendCurrent();
        } else {
            if (this.v1 == ID_HANDLER_A) {
                this.v1 = ID_HANDLER_B;
            } else {
                this.v1 = ID_HANDLER_A;
            }
            packet.id = this.v1;
            packet.a1 = 0;
            for (var i = 0; i < DATA_SIZE; i++) {
                this.v2++;
                if (this.v2 > 26) {
                    this.v2 = 1;
                }
                packet.a2[i] = this.v2;
            }
            return this.scheduler.queue(packet);
        }
    }, Σ, "αLULd-tHsg0Hqn");Σ.addFunction(function αUVYE() {
        return 'WorkerTask';
    }, Σ, "αUVYE-6uwM7hec");Σ.addFunction(function αfB6d(packet) {
        var Σ_αfB6d = new Σ.Scope(this, Σ, αfB6d, function () {
            return [
                { packet: packet },
                {}
            ];
        });
        if (packet != null) {
            if (packet.kind == KIND_WORK) {
                this.v1 = packet.addTo(this.v1);
            } else {
                this.v2 = packet.addTo(this.v2);
            }
        }
        if (this.v1 != null) {
            var count = this.v1.a1;
            var v;
            if (count < DATA_SIZE) {
                if (this.v2 != null) {
                    v = this.v2;
                    this.v2 = this.v2.link;
                    v.a1 = this.v1.a2[count];
                    this.v1.a1 = count + 1;
                    return this.scheduler.queue(v);
                }
            } else {
                v = this.v1;
                this.v1 = this.v1.link;
                return this.scheduler.queue(v);
            }
        }
        return this.scheduler.suspendCurrent();
    }, Σ, "αfB6d-9sqvmajG");Σ.addFunction(function αxj05() {
        return 'HandlerTask';
    }, Σ, "αxj05-iqEmIH6I");Σ.addFunction(function αj22n(queue) {
        var Σ_αj22n = new Σ.Scope(this, Σ, αj22n, function () {
            return [
                { queue: queue },
                {
                    peek: peek,
                    next: next
                }
            ];
        });
        this.link = null;
        if (queue == null) {
            return this;
        }
        var peek, next = queue;
        while ((peek = next.link) != null) {
            next = peek;
        }
        next.link = this;
        return queue;
    }, Σ, "αj22n-RLEGqRfI");Σ.addFunction(function αx4JH() {
        return 'Packet';
    }, Σ, "αx4JH-fh229fkt");Σ.addFunction(function αKAJ4() {
        return Date.now();
    }, Σ, "αKAJ4-pJXNbZQ1");Σ.addFunction(function αO5FE() {
    }, Σ, "αO5FE-uf8Ay9Lp");Σ.addFunction(function αyyDO() {
    }, Σ, "αyyDO-1Pe6mr1z");(function BM_Start(){var Σ_BM_Start = new Σ.Scope(this, Σ, BM_Start, function(){ return [{}, {data:data,elapsed:elapsed,start:start,end:end,i:i}] }, "BM_Start-fvvYhqot").restore(Σ).hoist(doRun, Σ_BM_Start);function doRun() {
            var Σ_BM_Start_doRun = new Σ.Scope(this, Σ_BM_Start, doRun, function () {
                return [
                    {},
                    {}
                ];
            });
            BM_SetupFunc();
            Σ.console.log('Iteration : ' + i);
            BM_RunFunc();
            elapsed = Date.now() - start;
            BM_TearDownFunc();
            i++;
            if (i < BM_Iterations) {
                if (i === BM_Iterations / 2 + 1){
                    (function report(){
                        pidusage(process.pid, function(err, stat) {
                            process.send({
                                timestamp: Date.now(),
                                memory: process.memoryUsage(),
                                cpu: stat.cpu
                            })
                        });
                        setTimeout(report, Math.round(Math.random()*200 + 100));
                    })();
                }
                Σ.setImmediate(doRun);
            } else {
                if (data != null) {
                    data.runs += i;
                    data.elapsed += elapsed;
                }
                Σ.console.log('Runs: ' + data.runs + '\t|\tElapsed: ' + data.elapsed);
                end = Date.now();
                Σ.console.log('Total time : ' + (end - start) + ' ms');
                var usec = data.elapsed * 1000 / data.runs;
                var rms = BM_RMS ? BM_RMS() : 0;
                BM_Results.push({
                    time: usec,
                    latency: rms
                });
                process.exit();
            }
        };var data = {"runs" : 0,"elapsed" : 0};var elapsed = 0;var start = 1561592537632;var end = null;var i = 1500;}());Σ.funcs["Scheduler"].prototype.addIdleTask = Σ.getFunction("Σ.α9up5-WGQ7mr0I");Σ.funcs["Scheduler"].prototype.addWorkerTask = Σ.getFunction("Σ.αgPAQ-tnP3jKzi");Σ.funcs["Scheduler"].prototype.addHandlerTask = Σ.getFunction("Σ.αPYFu-ZmT7igqY");Σ.funcs["Scheduler"].prototype.addDeviceTask = Σ.getFunction("Σ.α5SJn-fBhc2VbI");Σ.funcs["Scheduler"].prototype.addRunningTask = Σ.getFunction("Σ.αEmM7-S3Hn5tLQ");Σ.funcs["Scheduler"].prototype.addTask = Σ.getFunction("Σ.αBJCS-ziRn1Rdv");Σ.funcs["Scheduler"].prototype.schedule = Σ.getFunction("Σ.αIwcN-ESUkqO9w");Σ.funcs["Scheduler"].prototype.release = Σ.getFunction("Σ.αq3Dc-NSEPcrTk");Σ.funcs["Scheduler"].prototype.holdCurrent = Σ.getFunction("Σ.αp3KH-WCbknrFH");Σ.funcs["Scheduler"].prototype.suspendCurrent = Σ.getFunction("Σ.α633I-rMA6XwoQ");Σ.funcs["Scheduler"].prototype.queue = Σ.getFunction("Σ.αJyHp-7hAfUlcz");Σ.funcs["TaskControlBlock"].prototype.setRunning = Σ.getFunction("Σ.αFqpR-WYiP0CL2");Σ.funcs["TaskControlBlock"].prototype.markAsNotHeld = Σ.getFunction("Σ.αRnlv-HKSd0qPp");Σ.funcs["TaskControlBlock"].prototype.markAsHeld = Σ.getFunction("Σ.αjSwN-fSGbg8n6");Σ.funcs["TaskControlBlock"].prototype.isHeldOrSuspended = Σ.getFunction("Σ.αbOFW-2kkLJzqQ");Σ.funcs["TaskControlBlock"].prototype.markAsSuspended = Σ.getFunction("Σ.αuJOh-TAxXoCJL");Σ.funcs["TaskControlBlock"].prototype.markAsRunnable = Σ.getFunction("Σ.α1U3z-Gjw7eaOX");Σ.funcs["TaskControlBlock"].prototype.run = Σ.getFunction("Σ.αXvUu-zgqGVEJZ");Σ.funcs["TaskControlBlock"].prototype.checkPriorityAdd = Σ.getFunction("Σ.α0syV-HQpuzPSA");Σ.funcs["TaskControlBlock"].prototype.toString = Σ.getFunction("Σ.αCl9a-96uuWXk6");Σ.funcs["IdleTask"].prototype.run = Σ.getFunction("Σ.αUbuh-IVX3ZyCV");Σ.funcs["IdleTask"].prototype.toString = Σ.getFunction("Σ.αwZld-LObDjo9i");Σ.funcs["DeviceTask"].prototype.run = Σ.getFunction("Σ.α4RIU-jbyzZwrU");Σ.funcs["DeviceTask"].prototype.toString = Σ.getFunction("Σ.αUE3M-1E1LtSpD");Σ.funcs["WorkerTask"].prototype.run = Σ.getFunction("Σ.αLULd-tHsg0Hqn");Σ.funcs["WorkerTask"].prototype.toString = Σ.getFunction("Σ.αUVYE-6uwM7hec");Σ.funcs["HandlerTask"].prototype.run = Σ.getFunction("Σ.αfB6d-9sqvmajG");Σ.funcs["HandlerTask"].prototype.toString = Σ.getFunction("Σ.αxj05-iqEmIH6I");Σ.funcs["Packet"].prototype.addTo = Σ.getFunction("Σ.αj22n-RLEGqRfI");Σ.funcs["Packet"].prototype.toString = Σ.getFunction("Σ.αx4JH-fh229fkt");var COUNT = 1000;var EXPECTED_QUEUE_COUNT = 2322;var EXPECTED_HOLD_COUNT = 928;var ID_IDLE = 0;var ID_WORKER = 1;var ID_HANDLER_A = 2;var ID_HANDLER_B = 3;var ID_DEVICE_A = 4;var ID_DEVICE_B = 5;var NUMBER_OF_IDS = 6;var KIND_DEVICE = 0;var KIND_WORK = 1;var STATE_RUNNING = 0;var STATE_RUNNABLE = 1;var STATE_SUSPENDED = 2;var STATE_HELD = 4;var STATE_SUSPENDED_RUNNABLE = 3;var STATE_NOT_HELD = -5;var DATA_SIZE = 4;var performance = {"now" : Σ.getFunction("Σ.αKAJ4-pJXNbZQ1")};var BM_RunFunc = Σ.getFunction("Σ.runRichards");var BM_SetupFunc = Σ.getFunction("Σ.αO5FE-uf8Ay9Lp");var BM_TearDownFunc = Σ.getFunction("Σ.αyyDO-1Pe6mr1z");var BM_RMS = undefined;var BM_Iterations = 3000;var BM_Min_Iterations = 16;var BM_Results = [];Σ.setImmediate(Σ.getFunction("Σ/BM_Start-fvvYhqot.doRun"), "ydHvb08r"); }, 'mqtt://localhost', 'richards.js/4l9N9AbX', {});