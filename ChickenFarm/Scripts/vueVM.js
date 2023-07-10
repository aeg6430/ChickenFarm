
window.onload = function () {

    const vm = new Vue({
        el: '#app',
        data: {
            GUID:'',
            UserID:'',
            UserEmail:'',
            UserPassword:'',
            ciphertext: '',
            originalText: '',
            idBlured: false,
            emailBlured: false,
            passwordBlured: false,
            valid: false,
            showPassword: false,
            isUserEmailExist: false,
            isUserIDExist: false,
            isGameDataExist: false,
            LoginGUID: '',
            UserLoginID: '',
            UserLoginEmail: '',
            UserLoginPassword: '',
            emailLoginBlured: false,
            passwordLoginBlured: false,
            validLogin: false,
            isUserLoginEmailNotExist: false,
            isUserLoginPasswordNotExist: false,
            isGameDataExist: false,
            showLoginPassword: false,
            loginCiphertext: '',
            loginOriginalText: '',
            isRegistered: false,
            isLoggedin: false,
            value: 0,
            autoClickActive: false,
            autoClickInterval: null,
            isAudioEnabled: true,
            isNotifyEnabled: true,
            bonuses: [
                { level: 1, cost: 10, multiplier: 2, multiplierIncrement: 1, img: "/Images/Items/I_big_milk.png" ,name:'神奇的ㄋㄟㄋㄟ'},
                { level: 1, cost: 30, multiplier: 10, multiplierIncrement: 15, img: "/Images/Items/I_carrot.png", name: '紅蘿蔔' },
                { level: 1, cost: 60, multiplier: 25, multiplierIncrement: 30, img: "/Images/Items/I_corn.png", name: '玉米'},
                { level: 1, cost: 90, multiplier: 40, multiplierIncrement: 65, img: "/Images/Items/I_mushroom.png", name: '菇菇'},
                { level: 1, cost: 150, multiplier: 140, multiplierIncrement: 200, img: "/Images/Items/I_strawberry.png", name: '草莓'},
                { level: 1, cost: 200, multiplier: 160, multiplierIncrement: 250, img: "/Images/Items/I_tomato.png", name: 'ToMaTo'},
                { level: 1, cost: 250, multiplier: 200, multiplierIncrement: 300, img: "/Images/Items/I_jelly_berry.png", name: '莓莓' },
                { level: 1, cost: 350, multiplier: 250, multiplierIncrement: 400, img: "/Images/Items/I_gumberries.png", name: '漿果果' },
            ],
            skins: [
                { title: "A", text: "t", cost: 100, img: "~/Images/Chickenfly.gif", disabled: false },
                { title: "B", text: "t", cost: 1000, img: "~/Images/ChickenAttack.gif", disabled: false },
                { title: "A", text: "t", cost: 10000, img: "~/Images/ChickenJumping.gif", disabled: false },
                { title: "B", text: "t", cost: 888888, img: "~/Images/ChickenPeck.gif", disabled: false },
                { title: "A", text: "t", cost: 1999999, img: "~/Images/ChikcenWalking.gif", disabled: false },
                { title: "B", text: "t", cost: 10000000, img: "~/Images/ChickenDamage.gif", disabled: false }
            ],
            achievements: [
                { index: 0, title: "Hit the road", text: "解鎖連點", unlocked: false },
                { index: 1, title: "Click Click Click", text: "未解鎖連點 \並且獲得1K顆蛋 ", unlocked: false },
                { index: 2, title: "孵蛋達人", text: "獲得1M顆蛋", unlocked: false },
                { index: 3, title: "超級孵蛋人", text: "獲得1B顆蛋", unlocked: false },
                { index: 4, title: "施工中", text: "敬請期待", unlocked: false },
                { index: 5, title: "施工中", text: "敬請期待", unlocked: false },
                { index: 6, title: "施工中", text: "敬請期待", unlocked: false },
                { index: 7, title: "施工中", text: "敬請期待", unlocked: false },
                { index: 8, title: "施工中", text: "敬請期待", unlocked: false },
                { index: 9, title: "施工中", text: "敬請期待", unlocked: false },
            ],
            toastData: [
                { type: "通知", text: "進度儲存" },
                { type: "成就解鎖", text: "獲得", text2: "顆蛋" },
                { type: "商品解鎖", text: "快去看看" },
                { type: "通知", text: "進度載入" },
                { type: "通知", text: "無資料" },
                { type: "通知", text: "進度刪除" },
                { type: "成就解鎖", achievements: "Hit the road" },//連點
                { type: "成就解鎖", achievements: "Click Click Click" }, //無連點 1K
                { type: "成就解鎖", text: "獲得稱號:", achievements: "孵蛋達人" }, //1M
                { type: "成就解鎖", text: "獲得稱號:", achievements: "超級孵蛋人" }, //1B
                { type: "通知", text: "Hi!" },
                { type: "通知", text: "DB進度儲存" },
                { type: "通知", text: "DB進度載入" },
                { type: "通知", text: "DB無資料" },
                { type: "通知", text: "DB進度刪除" },
                { type: "通知", text: "帳號登出" },
            ],
            toastStatus: 0,
            showToastFlags: {
                10: false,
                100: false,
                1000: false,
                1000000: false,
                1000000000: false,

            },
            eggs: 0,
            valueIncreases: [],
            toastShow: false,
            result: []

        },
        computed: {
            iconClass() {
                return this.isSave ? 'fa-solid fa-circle-notch' : 'fa-solid fa-cloud-arrow-up';
            },
            clickSoundSwitchIcon() {
                return this.isAudioEnabled ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off';
            },
            clickNotifySwitchIcon() {
                return this.isNotifyEnabled ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off';
            },
            showValueIncreases() {
                return this.valueIncreases.slice(-10);
            },
            sortedResult() {
                return this.result.sort((a, b) => {
                    const aValue = JSON.parse(a.GameData).value;
                    const bValue = JSON.parse(b.GameData).value;
                    return bValue - aValue; 
                });
            }
        },
        watch: {
            UserID(newValue) {
                if (newValue === '') {
                    this.isUserIDExist = false
                }
            },
            UserEmail(newValue) { 
                if (newValue === '') {
                    this.isUserEmailExist=false
                }
            },
            UserLoginEmail(newValue) { 
             this.isUserLoginEmailNotExist = false
            },
            UserLoginPassword(newValue) {
             this.isUserLoginPasswordNotExist = false
            },
       

            value(newValue) {

                if (newValue === 10 && !this.showToastFlags[10]) {
                    this.toastStatus = 1;
                    this.eggs = 10
                    this.showToast()
                    this.showToastFlags[10] = true;
                }
                else if (newValue >= 100 && newValue <= 150 && !this.showToastFlags[100]) {
                    this.toastStatus = 1;
                    this.eggs = 100
                    this.showToast()
                    this.showToastFlags[100] = true;
                }
                else if (newValue >= 1000 && newValue <= 1500 && this.autoClickActive == false && !this.showToastFlags[1000]) {
                    this.toastStatus = 7;
                    this.showToast()
                    this.showToastFlags[1000] = true;
                    this.achievements[1].unlocked = true;
                }
                else if (newValue >= 1000000 && newValue <= 1500000 && !this.showToastFlags[1000000]) {
                    this.toastStatus = 8;
                    this.showToast()
                    this.showToastFlags[1000000] = true;
                    this.achievements[2].unlocked = true;
                }
                else if (newValue >= 1000000000 && newValue <= 1999500000 && !this.showToastFlags[1000000000]) {
                    this.toastStatus = 9;
                    this.showToast()
                    this.showToastFlags[1000000000] = true;
                    this.achievements[3].unlocked = true;
                }
            },
           


        },
        methods: {
            validate() {
                this.idBlured = true;
                this.emailBlured = true;
                this.passwordBlured = true;
                if (this.validID(this.UserID) && this.validEmail(this.UserEmail) && this.validPassword(this.UserPassword)) {
                    this.valid = true;
                }
            },
            validateLogin() {
                this.emailLoginBlured = true;
                this.passwordLoginBlured = true;
                if (this.validEmail(this.UserLoginEmail)) {
                    this.validLogin = true;
                }
            },
            validID(UserID) {
                return UserID.trim().length > 5 && !UserID.includes(' ');
            },
            validEmail(UserEmail) {
                var re = /(.+)@(.+)\.(com|org|net|edu|gov|mil|io|co\.uk|gmail|qq|yahoo|[a-zA-Z]{2})$/;
                return re.test(UserEmail);
            },
            validPassword(UserPassword) {
                UserPassword = UserPassword.normalize('NFKC');
                var re = /^(?=.*[A-Z])[ -~]{5,}$/;
                return re.test(UserPassword);
            },    
            register() {
                this.isUserIDExist = false;
                this.isUserEmailExist = false;
                this.validate();
                if (this.valid) {
                    var vmThis = this;
                    $.ajax({
                        type: "POST",
                        url: "https://localhost:44376/api/UserPostByRequest",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            "UserID": this.UserID,
                            "UserEmail": this.UserEmail
                        }),
                        dataType: "json",
                        success: function (result) {
                            console.log("result", result)

                            if (result.length>0) {
                                result.forEach(data => {
                                    const userID = data.UserID;
                                    const userEmail = data.UserEmail;

                                    if (userID.trim() === vmThis.UserID.trim()) {
                                        console.log("ID重複");
                                        vmThis.isUserIDExist = true;
                                    }

                                    if (userEmail.trim() === vmThis.UserEmail.trim()) {
                                        console.log("Email重複");
                                        vmThis.isUserEmailExist = true;
                                    }
                                });
                            }     
                            else 
                            {
                                vmThis.GUID = uuid.v4()
                                vmThis.encrypt()
                                console.log("POST");
                                $.ajax({
                                    type: "POST",
                                    url: "https://localhost:44376/api/User",
                                    contentType: "application/json; charset=utf-8",
                                    data: JSON.stringify({
                                        "GUID": vmThis.GUID,
                                        "UserID": vmThis.UserID,
                                        "UserEmail": vmThis.UserEmail,
                                        "UserPassword": vmThis.ciphertext
                                    }),
                                    dataType: "json",
                                    success: function () {

                                    },
                                    error: function (xhr, status, error) {
                                        console.log("Error", xhr.responseText);
                                    }
                                });
                                vmThis.isRegistered = true;
                                vmThis.$bvModal.hide('modalLogin');
                            }
                        },
                        error: function (xhr, status, error) {
                            console.log("Error", xhr.responseText);
                        }
                    });
                }       
            },
            login() {
                this.isUserLoginEmailNotExist = false;
                this.isUserLoginPasswordNotExist = false;
                this.validateLogin();
                //console.log("valid", this.validLogin)
                if (this.validLogin) {
                    var vmThis = this;
                    $.ajax({
                        type: "POST",
                        url: "https://localhost:44376/api/UserPostByRequest",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            "UserEmail": this.UserLoginEmail
                        }),
                        dataType: "json",
                        success: function (result) {
                           // console.log("register result", result)
                            if (result.length > 0) {
                                result.forEach(data => {
                                    const userLoginEmail = data.UserEmail;
                                    if (userLoginEmail.trim() === vmThis.UserLoginEmail.trim()) {
                                        console.log("Email存在");
                                        isUserLoginEmailExist = true;
                                        //console.log("GUID", data.GUID)
                                       // console.log("UserPassword", data.UserPassword)
                                        vmThis.LoginGUID = data.GUID
                                        vmThis.loginCiphertext=data.UserPassword 
                                        vmThis.decrypt();

                                        if (vmThis.loginOriginalText == vmThis.UserLoginPassword) {
                                            console.log("登入成功")
                                            vmThis.isLoggedin = true;
                                            vmThis.$bvModal.hide('modalLogin');
                                            vmThis.UserLoginID = data.UserID
                                            //console.log("vmThis.isLoggedin", vmThis.isLoggedin)
                                            //console.log("vmThis.UserLoginID", vmThis.UserLoginID)
                                            vmThis.saveLoginStatus();
                                            
                                        }
                                        else {
                                            console.log("密碼錯誤")
                                            vmThis.isUserLoginPasswordNotExist = true;
                                        }
                                    }
                                });
                            }
                            else {
                                console.log("帳號不存在")
                      
                                vmThis.isUserLoginEmailNotExist = true;
                            }
                        },
                        error: function (xhr, status, error) {
                            console.log("Error", xhr.responseText);
                        }
                    });
                }
            },
            logout() {
               
                setTimeout(() => {
                    sessionStorage.clear();  
                }, 500);

                this.toastStatus = 15;
                this.showToast();

            },
            encrypt() {
                this.ciphertext = CryptoJS.AES.encrypt(this.UserPassword, this.GUID).toString();
                console.log("ciphertext", this.ciphertext);
            },
            decrypt() {
                this.loginOriginalText = CryptoJS.AES.decrypt(this.loginCiphertext, this.LoginGUID).toString(CryptoJS.enc.Utf8);
                console.log("originalText", this.loginOriginalText);
            },
            async showHiNotify() {
                this.reloadLoginStatus();
    
               setTimeout(() => {
                    this.toastStatus = 10;
                    this.showToast();
                }, 2000);

            
               
                

            },
            addValue() {
                let valueIncrease = 1;
                for (let i = 0; i < this.bonuses.length; i++) {
                    const bonus = this.bonuses[i];
                    if (bonus.level > 1) {
                        valueIncrease += this.getMultiplier(bonus);
                    }
                }
                this.value += valueIncrease;
                this.valueIncreases.push(valueIncrease);
                const savedSwitchStatusData = localStorage.getItem('switchStatus');
                if (savedSwitchStatusData) {
                    const switchStatusData = JSON.parse(savedSwitchStatusData);
                    this.isAudioEnabled = switchStatusData.isAudioEnabled;
                    this.isNotifyEnabled = switchStatusData.isNotifyEnabled;
                    if (this.isAudioEnabled) {
                        this.playSound("/audio/EggPop.mp3");
                    }        
                }
                setTimeout(() => {
                    this.valueIncreases.shift();
                }, 500);
            },
            buyAutoClick() {
                if (this.value >= 5 ) {
                    this.value -= 5;

                    const savedGameData = localStorage.getItem('gameData');
                    console.log("savedGameData", savedGameData)

                    
                 
                    if (savedGameData) {
                        const gameData = JSON.parse(savedGameData);
                        this.autoClickActive = gameData.autoClickActive;
                        console.log("autoClickActive", this.autoClickActive);
                        this.autoClickActive = true

                    } else {
                        this.autoClickActive = true; 
                    }


                    if (this.autoClickActive) {
                        this.startAutoClick();
                    } 
                    
                    this.toastStatus = 6;
                    this.showToast();
                    this.achievements[0].unlocked = true;


                }
            },
            startAutoClick() {
                if (this.autoClickInterval === null) {
                    this.autoClickInterval = setInterval(() => {
                        let valueIncrease = 1;
                        for (let i = 0; i < this.bonuses.length; i++) {
                            const bonus = this.bonuses[i];
                            if (bonus.level > 1) {
                                valueIncrease += this.getMultiplier(bonus);
                            }
                        }
                        this.value += valueIncrease;
                    }, 1000);
                }
            },
            toggleSound() {
                this.isAudioEnabled = !this.isAudioEnabled;
                const switchStatusData = {
                    isAudioEnabled: this.isAudioEnabled
                };
                localStorage.setItem('switchStatus', JSON.stringify(switchStatusData));
            },
            toggleNotify() {
                this.isNotifyEnabled = !this.isNotifyEnabled;
                console.log("isNotifyEnabled", this.isNotifyEnabled)
            },
            playSound(sound) {        
                    var audio = new Audio(sound);
                    audio.play(); 
            },
            upgradeBonus(index) {
                const bonus = this.bonuses[index];
                if (this.value >= bonus.cost && bonus.level < 10) {
                    this.value -= bonus.cost;
                    bonus.level++;
                    bonus.cost *= 2;
                    bonus.multiplier += bonus.multiplierIncrement; 
                }
            },
            getMultiplier(bonus) {
                return bonus.multiplier;
            },
            formatValue(value) {
                if (value < 1000) {
                    return value.toString();
                }
                else if (value < 1000000) {
                    return (value / 1000).toFixed(1) + 'K';
                }
                else if (value < 1000000000) {
                    return (value / 1000000).toFixed(1) + 'M';
                }
                else if (value < 1000000000) {
                    return (value / 1000000000).toFixed(1) + 'B';
                }
                else {
                    return (value / 1000000000000).toFixed(1) + 'T';
                }
            },
            getRankingData() {
                if (this.isLoggedin) {
                    $.ajax({
                        type: "GET",
                        url: "https://localhost:44376/api/Game",
                        contentType: "application/json; charset=utf-8",
                        success: (result) => {
                            this.result = result;
                        },
                        error: function (xhr, status, error) {
                            console.log("Error", xhr.responseText);
                        }
                    });
                }
            },
            showToast() {
                const bsToast = new bootstrap.Toast(document.querySelector('.toast'), {
                    autohide: false
                });
                bsToast.show();
                if (this.isNotifyEnabled) {
                    this.playSound("/audio/toast.mp3");
                }
                setTimeout(() => {
                    bsToast.hide();
                }, 2000);
            },
            saveGame() {
               

                
                this.showToast()

                if (this.isLoggedin) {
                    this.saveGameToDB();
                    
                }
                else {
                    const gameData = {
                        value: this.value,
                        autoClickActive: this.autoClickActive,
                        bonuses: this.bonuses
                    };
                    localStorage.setItem('gameData', JSON.stringify(gameData));
                    const achievementsData = {
                        showToastFlags: { ...this.showToastFlags },
                        achievements: this.achievements.map((achievement) => ({ ...achievement })),
                    };
                    localStorage.setItem('achievementsData', JSON.stringify(achievementsData));
                    this.toastStatus = 0;
                }

 
            },
            reloadGame() {
                
               
                this.showToast()
                if (this.isLoggedin) {
                    this.reloadGameFromDB();
                }
                else {
                    const savedGameData = localStorage.getItem('gameData');
                    if (savedGameData) {
                        const gameData = JSON.parse(savedGameData);
                        this.value = gameData.value;
                        this.autoClickActive = gameData.autoClickActive;
                        this.bonuses = gameData.bonuses;
                        if (this.autoClickActive) {
                            this.startAutoClick();
                        }
                        this.toastStatus = 3;
   
                    }
                    else {
                        this.toastStatus = 4;
 
                    }
                    const achievementsData = JSON.parse(localStorage.getItem('achievementsData'));
                    if (achievementsData) {
                        this.showToastFlags = { ...achievementsData.showToastFlags };
                        this.achievements = achievementsData.achievements.map((achievement) => ({ ...achievement }));
                    }
                }


               
            },
            resetGame() {
                this.value = 0;
                this.autoClickActive = false;
                this.bonuses.forEach(bonus => {
                    bonus.level = 1;
                    bonus.cost = 10;
                    bonus.multiplier = bonus.level === 1 ? bonus.multiplier : 1;
                    bonus.multiplierIncrement = bonus.multiplierIncrement;
                });

                localStorage.removeItem('gameData');
                localStorage.removeItem('achievementsData');
                this.showToastFlags = {
                    10: false,
                    100: false,
                    1000: false,
                    1000000: false,
                    1000000000: false,
                };
                this.achievements.forEach((achievement) => {
                    achievement.unlocked = false;
                });




                this.toastStatus = 5;
                this.showToast()
           
            },
            saveSwitchStatus() {
                const switchStatusData = {
                    isAudioEnabled: this.isAudioEnabled,
                    isNotifyEnabled: this.isNotifyEnabled,
                };
                
                localStorage.setItem('switchStatus', JSON.stringify(switchStatusData));

                

            },
            reloadSwitchStatus() {
                const savedSwitchStatusData = localStorage.getItem('switchStatus');
                if (savedSwitchStatusData) {
                    const switchStatusData = JSON.parse(savedSwitchStatusData);
                    this.isAudioEnabled = switchStatusData.isAudioEnabled;
                    this.isNotifyEnabled = switchStatusData.isNotifyEnabled;
                }
            },
            saveLoginStatus() {
                sessionStorage.setItem('isLoggedin', this.isLoggedin);
                sessionStorage.setItem('UserLoginID', this.UserLoginID);
            },
            reloadLoginStatus() {
               // console.log("reload")
                this.isLoggedin = sessionStorage.getItem('isLoggedin');
                this.UserLoginID = sessionStorage.getItem('UserLoginID');
            },
            resetLoginStatus() {
                sessionStorage.removeItem('isLoggedin');
                sessionStorage.removeItem('UserLoginID');
                this.isLoggedin = false
                this.UserLoginID=''
            },
            saveGameToDB() {
                const gameData = {
                    value: this.value,
                    autoClickActive: this.autoClickActive,
                    bonuses: this.bonuses
                };
                const achievementsData = {
                    showToastFlags: { ...this.showToastFlags },
                    achievements: this.achievements.map((achievement) => ({ ...achievement })),
                };

                const param = ('https://localhost:44376/api/Game/' + this.UserLoginID)
                const vmThis = this;
                $.ajax({
                    type: "GET",
                    url: param,
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        console.log("result", result)
                        
                        if (result != null) {
                            console.log("HAS DATA")
                            $.ajax({
                                type: "PUT",
                                url: param,
                                contentType: "application/json; charset=utf-8",
                                data: JSON.stringify({
                                   
                                    "GameData": JSON.stringify(gameData),
                                    "AchievementData": JSON.stringify(achievementsData)
                                }),
                                dataType: "json",
                                success: function (result) {
                                    console.log("PUT Success")
                                    vmThis.toastStatus = 11;
                                    console.log("DB進度儲存 PUT")
                                    
                              
                                    
                                },
                                error: function (xhr, status, error) {
                                    console.log("Error", xhr.responseText);
                                }
                            });
                        }
                        else {
                            console.log("NO DATA")
                            $.ajax({
                                type: "POST",
                                url: "https://localhost:44376/api/Game",
                                contentType: "application/json; charset=utf-8",
                                data: JSON.stringify({
                                    "UserID": vmThis.UserLoginID,
                                    "GameData": JSON.stringify(gameData),
                                    "AchievementData": JSON.stringify(achievementsData)

                                }),
                                dataType: "json",
                                success: function (result) {
                                    console.log("POST Success")
                                    vmThis.toastStatus = 11;
                                    console.log("DB進度儲存 POST")


                                },
                                error: function (xhr, status, error) {
                                    console.log("Error", xhr.responseText);
                                }
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log("Error", xhr.responseText);
                    }
                });
            },
            reloadGameFromDB() {
                const param = ('https://localhost:44376/api/Game/' + this.UserLoginID)
                const vmThis = this;
                $.ajax({
                    type: "GET",
                    url: param,
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                     

                        if (result != null) {
                            vmThis.toastStatus = 12;
                         
                            vmThis.isGameDataExist = true;
                            const savedGameData = JSON.parse(result.GameData);
                            const achievementsData = JSON.parse(result.AchievementData)

                          



                            if (savedGameData) {
                                const gameData = savedGameData;
                                vmThis.value = gameData.value;
                                vmThis.autoClickActive = gameData.autoClickActive;
                                vmThis.bonuses = gameData.bonuses;
                                if (vmThis.autoClickActive) {
                                    vmThis.startAutoClick();
                                }

                            }
                            if (achievementsData) {
                                vmThis.showToastFlags = { ...achievementsData.showToastFlags };
                                vmThis.achievements = achievementsData.achievements.map((achievement) => ({ ...achievement }));
                            }
                           


                        }
                        else {
                            vmThis.toastStatus = 13;
           
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log("Error", xhr.responseText);
                    }
                });
            },
            getRandomPosition() {
                const randomTop = Math.floor(Math.random() * 200) - 100;
                const randomLeft = Math.floor(Math.random() * 200) - 100;
                return {
                    top: randomTop + 'px',
                    left: randomLeft + 'px'
                };
            },
            openModalStore() {
                this.$bvModal.show('modalStore');
            },
            openModalAchievement() {
                this.$bvModal.show('modalAchievement');
            },
            openModalLogin() {
                this.$bvModal.show('modalLogin');
            },
            
        },
        created() {    
            const savedSwitchStatusData = localStorage.getItem('switchStatus');
            if (savedSwitchStatusData) {
                const switchStatusData = JSON.parse(savedSwitchStatusData);
                this.isAudioEnabled = switchStatusData.isAudioEnabled;
                this.isNotifyEnabled = switchStatusData.isNotifyEnabled;
            }
            const savedLoginStatus = sessionStorage.getItem('isLoggedin');
            if (savedLoginStatus) {

                this.showHiNotify();
                this.reloadGameFromDB();
            }
            else {
                const savedGameData = localStorage.getItem('gameData');
                if (savedGameData) {
                    const gameData = JSON.parse(savedGameData);
                    this.value = gameData.value;
                    this.autoClickActive = gameData.autoClickActive;
                    this.bonuses = gameData.bonuses;
                    if (this.autoClickActive) {
                        this.startAutoClick();
                    }
                }
                const achievementsData = JSON.parse(localStorage.getItem('achievementsData'));
                if (achievementsData) {
                    this.showToastFlags = { ...achievementsData.showToastFlags };
                    this.achievements = achievementsData.achievements.map((achievement) => ({ ...achievement }));
                }
            }


          

        },
        mounted() {
            this.getRankingData();
        },
        beforeDestroy() {
            this.stopAutoClick();
        }
    });
}


