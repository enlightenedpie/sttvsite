<?php

###############################################
##### ENQUEUE ALL STYLES AND SCRIPTS HERE #####
###############################################

add_action('admin_enqueue_scripts', 'sttv_admin_scripts');
function sttv_admin_scripts($hook) {
	wp_dequeue_script('jquery');
	wp_deregister_script('jquery');
	
	//jquery scripts
	wp_enqueue_script('jquery','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',false,null);
	wp_enqueue_script('courses-admin',get_stylesheet_directory_uri().'/s/admin/courses.js','jquery',time(),true);
}

add_action('wp_enqueue_scripts','sttv_enqueue_all');
function sttv_enqueue_all() {
	//dequeue
	wp_dequeue_script('jquery');
	wp_deregister_script('jquery');
	
	
	//jquery scripts
	wp_enqueue_script('jquery','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',false,null);
	wp_enqueue_script('sttv-js', get_stylesheet_directory_uri().'/sttv-js.min.js','jquery',null,true);
	wp_enqueue_script('materialize-js', get_stylesheet_directory_uri().'/material/materialize.min.js','jquery',null);
	wp_enqueue_script('jq-validate','https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js','jquery');
	
	//styles
	wp_enqueue_style('materialize',get_stylesheet_directory_uri().'/material/materialize.min.css',false,time());
	wp_enqueue_style('sttv-main', get_stylesheet_directory_uri().'/styles.min.css', 'materialize', time());
	wp_enqueue_style('material-icons','https://fonts.googleapis.com/icon?family=Material+Icons','materialize',time());
	wp_enqueue_style('dashicons');
	
	//conditionals
	if (get_page_template_slug() == 'signup.php') :
		wp_enqueue_script('sttv-checkout', get_stylesheet_directory_uri().'/s/checkout.js','jquery',time(),true);
		wp_enqueue_script('sttv-checkout-stripe','https://js.stripe.com/v3/','sttv-checkout',null,false);
		wp_enqueue_script('sttv-material', get_stylesheet_directory_uri().'/s/sttv-material.js','jquery');
	elseif (is_page('contact')) :
		//wp_enqueue_script('sttv-validate',get_stylesheet_directory_uri().'/s/sttv-validate.js','jquery',time(),true);
	endif;
	
	if (is_singular('courses')) {
		wp_enqueue_script('courses-gzip',get_stylesheet_directory_uri().'/s/lz-string.js',null,null,true);
	}
}


add_action( 'login_enqueue_scripts', 'sttv_login_brand' );
function sttv_login_brand() { 
?> 
	<style type="text/css"> 
		body.login div#login h1 a {
			background-image: url(<?php header_image(); ?>);
			background-size: contain;
			display: block;
			width: 100%; 
		}
		</style>
<?php 
}
############################
##### GOOGLE ANALYTICS #####
############################

add_action('wp_head','sttv_ga',99);
function sttv_ga() { ?>
<script>
	window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
	ga('create', 'UA-69908802-1', 'auto');
	ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
<?php

##########################
##### FACEBOOK PIXEL #####
##########################

?><script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '131594624139844', {
em: 'insert_email_variable'
});
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=131594624139844&ev=PageView&noscript=1"
/></noscript>
<?php }

#########################
##### STAJAX OBJECT #####
#########################

add_action( 'wp_print_scripts' , 'stajax_object' );
function stajax_object() { 
	global $post; ?>
	<script>
		<?php
			$stajax = array(
				'ajaxURL'=>trailingslashit(site_url()).'stajax.php',
				'contentURL'=>get_stylesheet_directory_uri(),
				'stripe' => array(
					'public_key' => Spress()->public_key
				)
			);
		if (is_singular('courses')) {
			$stajax['rest'] = array(
				'nonce' => wp_create_nonce('wp_rest'), 
				'url' => rest_url(STTV_REST_NAMESPACE.'/course_data/'.$post->ID),
				'dls' =>rest_url(STTV_REST_NAMESPACE.'/course_download/'.$post->ID),
				'reviews'=>rest_url(STTV_REST_NAMESPACE.'/reviews/')
			);
		}
		?>
		var stajax = <?php echo json_encode($stajax); ?>;
	</script>
<?php }