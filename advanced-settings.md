# 高级设置

需要具备基础的前端知识，譬如 HTML 标签, CSS 选择器之类的。

> ⚠️ 警告：如果您不了解 CSS 选择器，请不要修改这些设置，可能导致识别功能失效

---

**教程：**

打开 F12 查看你需要识别的网站验证码结构，越详细越好，避免与其他网站冲突。

### 1. 查看验证码图案结构

如图所示，这个图片的标签为 img，根据上述原则，这里我可以通过下面的选择器获取到图片信息。

```css
/* 这种方式获取或许会影响其他的网站显示 */
img
.test-code img

/* 推荐：比较准确的获取到当前网站的验证码标签 */
.test-code img[alt="code1"]
.test-code img[title="code1"]
.test-code img[class="code1"]

/* 只要alt、title、class中包含 `code1` 字符即可获取 */
.test-code img[alt*="code1"]
.test-code img[title*="code1"]
.test-code img[class*="code1"]
```

![image](https://github.com/user-attachments/assets/76f513af-7373-4a9d-9e58-3605ff396aae)

### 2. 查看输入框结构

一样的道理，可以获取到输入框的 HTML 结构；

```css
input[name="captcha"]
```

### 3. 验证码规则系统

除了在设置界面中添加选择器外，还可以使用验证码规则系统来管理多个网站的验证码配置。规则系统通过远程的 `rules.json` 文件加载配置，格式如下：

```json
[
  {
    "url_pattern": "example.com",
    "captcha_image_selector": "img.captcha-image",
    "captcha_input_selector": "input.captcha-input"
  }
]
```

规则参数说明：
- `url_pattern`: 匹配网站URL的模式。支持以下几种格式：
  - 精确匹配: `"example.com"` - 如果URL中包含此字符串则匹配
  - 通配符: `"*.example.org"` - 支持 `*` 作为通配符
  - 正则表达式: `"/^https:\/\/secure\\.example\\.com\/.*/"` - 以 `/` 开头和结尾的字符串会被视为正则表达式
  - 全局匹配: `"*"` 或空值 - 对所有网站生效
- `captcha_image_selector`: 验证码图片的CSS选择器，**必填**
- `captcha_input_selector`: 验证码输入框的CSS选择器，如果为空则使用默认选择器

在设置面板的高级设置中，可以点击"重新加载规则"按钮获取最新的规则配置。

#### 自定义规则URL

您可以在高级设置面板中设置自定义的规则文件URL。默认URL为：
```
https://raw.githubusercontent.com/Alex-hj/my-userscript-dist/main/rules.json
```

如果您想使用自己的规则文件，可以修改此URL。如果留空，系统将使用默认URL。

---

切记，如果你不知道如何使用这些功能，关闭高级设置！
