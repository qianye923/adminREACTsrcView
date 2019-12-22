## 弹窗样式
弹窗现阶段分为QQlogin弹窗，小弹窗和大弹窗还有iframe内嵌弹窗
QQlogin弹窗样式固定，不可添加内容
Dialog Demo的地址为 
[Dialog Demo](http://localhost:8001/dialog_demo.html)

### 弹窗API

| :------: | :------: |  :------: |
| name | type | description |
| btn1st | String | 第一个蓝色按钮 |
| btn2nd | String | 第二个白色按钮 |
| onClose | function | 关闭区域点击回调函数 |
| onConfirm | function | 确认点击函数 |
| visible | Boolean | 显示隐藏 |
| className | String | 新样式 |


### 小弹窗
![image.png](/philozhang/netbar-gateway-admin/uploads/3A19197C6095421C8406D920EDBC0E85/image.png)

引用DialogBlank组件


    import '../../styles/app.scss';
    import DialogBlank from '../../components/dialogs/DialogBlank.jsx';

弹窗结构为这样，现阶段只有h3 h4 p有样式，

    <DialogBlank btn1st={'确定'}
                 btn2nd={'取消'}
                 onClose={(e) => this.onClose(e)}
                 visible={this.state.popVisible}
                 className={''}
                 onConfirm={(e) => this.onConfirm(e)}
                 >
            <div>
                 <h3>QQ网吧网关</h3>
                 <h4>当前已设置定时播报</h4>
                 <p>如确定选择循环播报，则当前设置的定时播报信息将被清除</p>
            </div>
      </DialogBlank>

### 中弹窗
     
引用DialogBlank组件,className加入pop-ml
弹窗结构为这样，现阶段只有h3 h5 p label有样式

![image.png](/philozhang/netbar-gateway-admin/uploads/784CB7C92E4C457EA8C5F7D49F70650D/image.png)

    import '../../styles/app.scss';
    import DialogBlank from '../../components/dialogs/DialogBlank.jsx';
    <DialogBlank btn1st={'确定'}
                 btn2nd={'消除设置'}
                 onClose={(e) => this.onClose(e)}
                 onConfirm={(e) => this.onConfirm(e)}
                 className={'pop-ml'}
                 visible={this.state.popmlVisible}
                 >
            <div>
                  <h3>QQ网吧网关</h3>
                  <h5>定时播报设置</h5>
                  <label htmlFor="" className={`pop-msg-label`}>
                            <em>每日播报时间(24小时制)：</em>
                            <input type="text" maxLength={'2'}/>
                            <span>时</span>
                            <input type="text" maxLength={'2'}/>
                            <span>分</span>
                            <a href="javascript:;">删除</a>
                  </label>
                  <label htmlFor="" className={`pop-msg-label`}>
                            <em>每日播报时间(24小时制)：</em>
                            <input type="text" maxLength={'2'}/>
                            <span>时</span>
                            <input type="text" maxLength={'2'}/>
                            <span>分</span>
                            <a href="javascript:;">新增</a>
                            <a href="javascript:;">删除</a>
                  </label>
                  <p className={`pop-msg-tips`}>第一项播报时间设置错误</p>
            </div>
    </DialogBlank>
    
显示信息的结构

![image.png](/philozhang/netbar-gateway-admin/uploads/BB6245216F2B403C9775A8BB7BE3B50E/image.png)

    <DialogBlank btn1st={'确定'}
                 btn2nd={'消除设置'}
                 onClose={(e) => this.onClose(e)}
                 onConfirm={(e) => this.onConfirm(e)}
                 className={'pop-ml'}
                 visible={this.state.popmlVisible}
                 >
         <div>
             <h3>QQ网吧网关</h3>
             <h5>定时播报设置</h5>
             <p>如确定选择时播报，则当前设置的循环播报信息将被清除。</p>
        </div>
    </DialogBlank>
### iFrame弹窗
    
引用DialogFrame组件,现阶段只有iframe有样式

    import DialogFrame from '../../components/dialogs/DialogFrame.jsx'

![image.png](/philozhang/netbar-gateway-admin/uploads/5CE527BAD8DA434C876F164484BCC539/image.png)

    <DialogFrame
           visible={this.state.frameVisible}
           name="frameVisible"
           onClose={this.onCloseFrame}>
           <iframe src="http://localhost:8001/register.html" frameBorder="0"> </iframe>
    </DialogFrame>


### 半透明遮罩层

引用Mask组件调用遮罩层，点击灰色遮罩层调用onClose函数

    import Mask from '../../components/dialogs/Mask.jsx';
    
    <Mask
         visible={this.state.MaskVisible}
         name="MaskVisible"
         onClose={this.handleCloseMask}
    >
    </Mask>