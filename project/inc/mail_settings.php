<?php

// ================== 返信フォームのための入力項目ここから ==================


// -+-+-+-+-+-+-+-+-+-+-+-+- 【 メールアドレスのみ納品前に再確認! 】 -+-+-+-+-+-+-+-+-+-+-+-

//クライアント様受信先メールアドレス設定
// $admin_mailto = "";
$admin_mailto = "test@project-union.com";

// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-


//++++++++++以下必須入力項目++++++++++

//クライアント様名称
$admin_name = "ホームステージャー・カンパニー";
//クライアント様郵便番号
$admin_zipcode = "532-0011";
//クライアント様ご住所
$admin_address = "大阪府大阪市淀川区西中島6-2-3　新大阪第７チサンビル726";
//クライアント様電話番号
$admin_phone = "06-6302-6311";
//クライアント様サイトURL
$admin_url = "http://home-stager.jp/";

//+++++++++++++++ここまで+++++++++++++++



//++++++++++任意入力項目++++++++++

//クライアント様fax番号
$admin_fax = "06-6100-5843";
//クライアント様お問い合わせ受付時間
$admin_hours = "10:00～18:00";
//クライアント様定休日
$admin_regular_holiday = "水曜日";

//+++++++++++++ここまで+++++++++++++


//++++++もし返信用メールアドレスを別途表記する場合は++++++

//お客さま返信表記用メールアドレス
$admin_infomail = "";

if ( $admin_infomail == "" ) {
	$admin_infomail = $admin_mailto;
}

//++++++++++++++++++++ここまで++++++++++++++++++++


// ================== 返信フォームのための入力項目ここまで ==================

function br2nl( $string ) {
	return preg_replace( '/<br[[:space:]]*\/?[[:space:]]*>/i', "", $string );
}
?>