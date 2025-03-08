/**
 * 浏览器标签标题动态效果
 * 支持多种效果：typing（打字机效果）、alternate（交替显示）、flashing（闪烁效果）
 */
class TabTitleAnimation {
    constructor(options = {}) {
        this.options = {
            originalTitle: options.originalTitle || document.title || 'Academic Research Institute',
            effect: options.effect || 'typing', // typing, alternate, flashing
            typeSpeed: options.typeSpeed || 200,
            pauseTime: options.pauseTime || 2000,
            flashingText: options.flashingText || '🔔 Academic Research Institute',
            alternateTexts: options.alternateTexts || ['Academic Research Institute', '学术研究院'],
            enabled: options.enabled !== undefined ? options.enabled : true
        };

        // 保存原始标题
        this.originalTitle = this.options.originalTitle;
        
        // 初始化变量
        this.isTabVisible = true;
        this.interval = null;
        this.pauseTimeout = null;
        this.currentIndex = 0;
        
        // 初始化
        if (this.options.enabled) {
            this.init();
        }
    }

    init() {
        // 检测标签页可见性变化
        document.addEventListener('visibilitychange', () => {
            this.isTabVisible = !document.hidden;
            
            if (this.isTabVisible) {
                document.title = this.originalTitle;
                this.stopAnimation();
            } else {
                // 标签变为不可见时开始动画
                this.startAnimation();
            }
        });
    }

    startAnimation() {
        // 根据选择的效果应用动画
        switch (this.options.effect) {
            case 'typing':
                this.startTypingEffect();
                break;
            case 'alternate':
                this.startAlternateEffect();
                break;
            case 'flashing':
                this.startFlashingEffect();
                break;
            default:
                this.startTypingEffect();
        }
    }

    stopAnimation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        
        if (this.pauseTimeout) {
            clearTimeout(this.pauseTimeout);
            this.pauseTimeout = null;
        }
        
        document.title = this.originalTitle;
    }

    // 打字机效果
    startTypingEffect() {
        let i = 0;
        const text = this.originalTitle;
        
        this.interval = setInterval(() => {
            if (i <= text.length) {
                document.title = text.substring(0, i) + (i < text.length ? '|' : '');
                i++;
            } else {
                clearInterval(this.interval);
                
                // 完成后暂停一段时间，然后重新开始
                this.pauseTimeout = setTimeout(() => {
                    if (!this.isTabVisible) {
                        this.startTypingEffect();
                    }
                }, this.options.pauseTime);
            }
        }, this.options.typeSpeed);
    }

    // 交替显示效果
    startAlternateEffect() {
        const texts = this.options.alternateTexts;
        this.currentIndex = 0;
        
        this.interval = setInterval(() => {
            document.title = texts[this.currentIndex];
            this.currentIndex = (this.currentIndex + 1) % texts.length;
        }, this.options.pauseTime);
    }

    // 闪烁效果
    startFlashingEffect() {
        let isOriginal = true;
        
        this.interval = setInterval(() => {
            if (isOriginal) {
                document.title = this.options.flashingText;
            } else {
                document.title = this.originalTitle;
            }
            isOriginal = !isOriginal;
        }, 1000);
    }
}

// 初始化标题动画
document.addEventListener('DOMContentLoaded', () => {
    new TabTitleAnimation({
        originalTitle: document.title,
        effect: 'alternate', // typing, alternate, flashing
        alternateTexts: ['Academic Research Institute', '学术研究院'],
        typeSpeed: 150,
        pauseTime: 3000
    });
}); 