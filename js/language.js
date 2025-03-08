document.addEventListener('DOMContentLoaded', function() {
    // 语言切换功能
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            // 实际的语言切换功能将在这里实现
            const selectedLanguage = this.value;
            console.log(`切换到语言: ${selectedLanguage}`);
            // 这里可以添加实际切换语言的逻辑
        });
    }
}); 