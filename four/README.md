<!-- 作为保存数据的接口 -->
/{?do}{?data}


参数：
    do = save
    data(obj, require)
响应：
    response 200(application/json)

        attributes

            msg(string, require) 保存成功的提示信息,保存失败则返回失败的提示信息

<!-- 此接口作为取数据的接口 -->
/{?do}
参数:
    do = getData
响应：
    response 200
        attributes
            data
+ body
```
{
    data: {}
}
```

