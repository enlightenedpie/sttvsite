<?php
if ( ! defined( 'ABSPATH' ) ) {exit;}


###########################
##### ACT SIGNUP FORM #####
###########################

function sttv_signup_form($form = 'act',$plan_id = 'pln_iNb3cxrjseTucocu',$plan_price = '19999') { 
//SP_sub::create();
	$country = file_get_contents('https://gist.githubusercontent.com/enlightenedpie/888ba7972fa617579c374e951bd7eab9/raw/b987e55ddc4cde75f50298559e3a173a132657af/gistfile1.txt');
?>
	<script src="https://js.stripe.com/v3/"></script>
    	<div class="nothing">
        	<form id="sttv-<?php print $form; ?>-signup" name="sttv-<?php print $form; ?>-signup" action="sttvajax_signup">
            	<div id="form-left_column" class="col s12 m6 offset-m3">
                	<div id="myinfo" class="col s12">
                        <input type="hidden" name="plan_id" value="<?php echo $plan_id; ?>"/>
                        <input type="hidden" name="plan_price" value="<?php echo $plan_price; ?>"/>
                        <input class="pvals" type="hidden" name="sttv_signup_tax" value="0"/>
                        <input class="pvals" type="hidden" name="sttv_signup_discount" value="0"/>
                        <input class="pvals" type="hidden" name="sttv_signup_discp" value="0"/>
                        <div class="row">
                            <h4>Your Information</h4>
                            <div class="input-field col s6">
                                <input type="text" class="validate" name="sttv_firstname" required/>
                                <label for="sttv_firstname">First Name</label>
                            </div>
                            <div class="input-field col s6">
                                <input type="text" class="validate" name="sttv_lastname" required/>
                                <label for="sttv_lastname">Last Name</label>
                            </div>
                            <div class="input-field col s12">
                                <input id="sttv_email" class="validate" name="sttv_email" type="email" required/>
                                <label data-error="Invalid email address" for="sttv_email">Email Address</label>
                            </div>
                            <div class="input-field col s12">
                                <input id="sttv_password" name="sttv_password" type="password" required/>
                                <label for="sttv_password">Choose Password</label>
                            </div>
                        </div>
                        <div class="row">
                        	<div class="col s12">
                                <h4 style="display:inline">Shipping Address</h4><input class="filled-in" type="checkbox" id="sttv_pri_shipping" name="sttv_pri_shipping" /><label style="margin-left:6em" for="sttv_pri_shipping">Priority Shipping? (+$15.00)</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="sttv_shipping_address1" name="sttv_shipping_address1" type="text" class="validate" required/>
                                <label for="sttv_shipping_address1" data-error="Invalid format" >Address Line 1</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="sttv_shipping_address2" name="sttv_shipping_address2" type="text" />
                                <label for="sttv_shipping_address2">Address Line 2</label>
                            </div>
                            <div class="input-field col s6 m3">
                                <input id="sttv_shipping_city" class="validate" name="sttv_shipping_city" type="text" required/>
                                <label for="sttv_shipping_city">City</label>
                            </div>
                            <div class="input-field col s6 m3">
                                <input id="sttv_shipping_state" class="validate" name="sttv_shipping_state" type="text" required/>
                                <label for="sttv_shipping_state">State</label>
                            </div>
                            <div class="input-field col s6 m3">
                                <input id="sttv_shipping_pcode" class="validate" name="sttv_shipping_pcode" type="tel" required/>
                                <label for="sttv_shipping_pcode">Postal Code</label>
                            </div>
                            <div class="input-field col s6 m3">
                                <select class="browser-default" class="validate" name="sttv_shipping_country" required>
                                    <option value disabled selected>Country...</option>
                                    <?php echo $country; ?>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div id="payment" class="col s12">
                        <div id="billing_fields" class="row">
                            <div class="col s12">
                            	<h4 style="display:inline">Billing Address</h4><input class="filled-in" type="checkbox" id="same_shipping" /><label style="margin-left:6em" for="same_shipping">Same as shipping</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="sttv_billing_address1" name="sttv_billing_address1" type="text" class="validate" required/>
                                <label class="active" for="sttv_billing_address1" data-error="Invalid format" >Address Line 1</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input id="sttv_billing_address2" name="sttv_billing_address2" type="text" />
                                <label class="active" for="sttv_billing_address2">Address Line 2</label>
                            </div>
                            <div class="input-field col s6 m3">
                                <input id="sttv_billing_city" name="sttv_billing_city" type="text" required/>
                                <label class="active" for="sttv_billing_city">City</label>
                            </div>
                            <div class="input-field col s6 m3">
                                <input id="sttv_billing_state" name="sttv_billing_state" type="text" required/>
                                <label class="active" for="sttv_billing_state">State</label>
                            </div>
                            <div class="input-field col s6 m3">
                                <input id="sttv_billing_pcode" name="sttv_billing_pcode" type="tel" required/>
                                <label class="active" for="sttv_billing_pcode">Postal Code</label>
                            </div>
                            <div class="input-field col s6 m3">
                                <select class="browser-default" name="sttv_billing_country" required>
                                	<option value disabled selected>Country...</option>
                                    <?php echo $country; ?>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button id="checkout_button" type="submit" class="button-wide z-depth-1" >Checkout</button>
                </div>
            </form>
        </div>
    <script>
	alert('hello');
	
		var form = $('#sttv-<?php print $form; ?>-signup');
		
		
		var stripe = Stripe('pk_test_aF7R0He4Yt4OYgAq3iERimgn');
		var elements = stripe.elements();
		var card = elements.create('card',{
			hidePostalCode: true
		});
		
		
		$(document).ready(function() {
			card.on('change', function(event) {
			  fsub.setOutcome(event);
			});
			
			$('#checkout_button').click(function(e) {
					e.preventDefault();
					if ($('input',form).hasClass('invalid') || ($('input',form).prop('required') && $('input',form).length < 1)) {
						  alert('Please check for errors');
					  } // validate
					
					price_updater();
					$('.modal').modal('open');
					
				});
			$('.signup-submit').click(function(e) {
				e.preventDefault();
				form.submit();
			});
			
			form.submit( function(e) {
			  e.preventDefault();
			  
			  $('.modal-content').empty().append('<h2>PROCESSING...</h2><br/><div class="progress"><div class="indeterminate"></div></div>');
			  
			  var det = {
				name: $('input[name=cardname]').val(),
				address_line1: $('input[name=sttv_billing_address1]').val(),
				address_line2: $('input[name=sttv_billing_address2]').val(),
				address_city: $('input[name=sttv_billing_city]').val(),
				address_state: $('input[name=sttv_billing_state]').val(),
				address_zip: $('input[name=sttv_billing_pcode]').val(),
				address_country: $('select[name=sttv_billing_country]').val()
			  };
			  
			  var data = {
				  inputs: $(this).serialize(),
				  url: window.location.href,
				  action: $(this).attr('action')
			  };
			  
			  stripe.createToken(card, det).then(fsub.setToken);
			  
			}); // end form submit
			
			$('#same_shipping').change(function() {
				if ($(this).is(":checked")) {
					
					$('input[name=sttv_billing_address1]').val($('input[name=sttv_shipping_address1]').val());
					$('input[name=sttv_billing_address2]').val($('input[name=sttv_shipping_address2]').val());
					$('input[name=sttv_billing_city]').val($('input[name=sttv_shipping_city]').val());
					$('input[name=sttv_billing_state]').val($('input[name=sttv_shipping_state]').val());
					$('input[name=sttv_billing_pcode]').val($('input[name=sttv_shipping_pcode]').val());
					$('select[name=sttv_billing_country]').val($('select[name=sttv_shipping_country]').val());
					
					Materialize.updateTextFields();
	
				} else {
					$("#billing_fields :input").each(function(){
						$(this).val('');
					});
					$("select[name=sttv_billing_country]").prop("selectedIndex", -1);
				}
				$('input[name=sttv_billing_pcode]').blur();
			});
		});// end document ready
		
		
		$('input[name=course_choice],input[name=sttv_pri_shipping]').change(function() {
			price_updater();
		});
	</script>
<?php

} //end signup form