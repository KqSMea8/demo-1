package com.jay.webviewdemo1;

import android.app.AlertDialog;
import android.app.Notification;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {


    private Button btn_back;
    private TextView txt_title;
    private Button btn_top;
    private Button btn_refresh;
    private WebView wView;
    private long exitTime = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        bindViews();
    }


    private void bindViews() {
        btn_back = (Button) findViewById(R.id.btn_back);
        txt_title = (TextView) findViewById(R.id.txt_title);
        btn_top = (Button) findViewById(R.id.btn_top);
        btn_refresh = (Button) findViewById(R.id.btn_refresh);
        wView = (WebView) findViewById(R.id.wView);
        wView.getSettings().setJavaScriptEnabled(true);

        btn_back.setOnClickListener(this);
        btn_refresh.setOnClickListener(this);
        btn_top.setOnClickListener(this);

//      wView.loadUrl("http://www.baidu.com");
        wView.loadUrl("http://cp01-ps-dev196-sufubo.epc.baidu.com:8082/smarthome/test.html");
        wView.setWebChromeClient(new WebChromeClient() {
            //这里设置获取到的网站title
            @Override
            public void onReceivedTitle(WebView view, String title) {
                super.onReceivedTitle(view, title);
                txt_title.setText(title);
            }

            @Override
            public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
//                Log.i("MainActivity", "onJsAlert url=" + url + ";message=" + message);
                final AlertDialog.Builder builder = new AlertDialog.Builder(view.getContext());
                builder.setTitle("提示").setMessage(message).setPositiveButton("确定", null
                );
                AlertDialog dialog = builder.create();
                dialog.show();
                result.confirm();
//                Toast.makeText(getApplicationContext(), message, Toast.LENGTH_LONG).show();
//                result.confirm();
                return true;
            }

//            @Override
//            public boolean onJsAlert(WebView view,String url, String message,  JsResult result) {
//                new AlertDialog.Builder(WebViewDemo.this).
//                setTitle("Alert").setMessage(message).setPositiveButton("OK",
//                new DialogInterface.OnClickListener() {
////                    @Override
////                    public void onClick(DialogInterface arg0, int arg1) {
////                        //TODO
////                    }
//                }).create().show();
//                result.confirm();
//                return super.onJsConfirm(view, url, message, result);
//            }
        });


        wView.setWebViewClient(new WebViewClient() {
            //在webview里打开新链接
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn_back:
                finish();          //关闭当前Activity
                break;
            case R.id.btn_refresh:
                wView.reload();    //刷新当前页面
                break;
            case R.id.btn_top:
                wView.setScrollY(0);   //滚动到顶部
                break;
        }
    }

    @Override
    public void onBackPressed() {
        if (wView.canGoBack()) {
            wView.goBack();
        } else {
            if ((System.currentTimeMillis() - exitTime) > 2000) {
                Toast.makeText(getApplicationContext(), "再按一次退出程序",
                        Toast.LENGTH_SHORT).show();
                exitTime = System.currentTimeMillis();
            } else {
                finish();
            }

        }
    }

//    @Override
//    public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
//        final NoticeDialog dialog = new NoticeDialog(EnjoyWingActivity.this, "", message, "确认");
//        dialog.show();
//
//        dialog.setNoticeListener(new NoticeDialog.NoticeListener() {
//            public void doConfirm() {
//                dialog.dismiss();
//            }
//            public  void doCancel() {
//                dialog.dismiss();
//            }
//        });
//
//        return true;
//    }


}
