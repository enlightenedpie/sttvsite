<?php get_template_part('templates/head'); ?>

<?php get_template_part('templates/nav'); ?>

<?php 
	global $current_user;
    $firstname = get_user_meta($current_user->ID,'first_name',true);
    $loggedin = is_user_logged_in();
?>
    <header class="z-depth-1" id="siteheader">
        <a href="#" id="main-menu" class="slide-bar">
            <div class="icon-block">
                <span class="dashicons dashicons-menu"></span>
                <span class="link-text">Menu</span>
            </div>
        </a>
        <div id="logo-box">
        	<a href="<?php echo site_url(); ?>">
            	<img src="<?php header_image(); ?>" alt="<?php echo bloginfo('name');?>" />
            </a>
        </div>
        <a href="https://courses.supertutortv.com/login" id="login">
            <div class="icon-block">
                <span class="dashicons dashicons-admin-users"></span>
                <span class="link-text">Login</span>
            </div>
        </a>
    </header>
    <div id="not-header-wrapper" class="row">
    <?php if (is_singular('courses')) : ?>
    	<div id="courses-left-wrapper" class="col m12 l9">
    <?php endif; ?>
    	<section class="z-depth-1" id="stage">
        	<?php get_template_part('templates/stage'); ?>
        </section>