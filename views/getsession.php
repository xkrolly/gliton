<?php

return "<div>
			<form method='post' id='paymentForm'>
          	<input type='hidden' name='amount' id='sess_amount'>
 				<div class='form-group'>
                    <div class='col-sm-12'>
                        <label for='report-type' style='font-weight:bold;'>Donation to this course</label>
                    </div>
                    <div class='col-sm-12' style=''>
                        <input type='number' class='form-control' required name='amount' id='amount' style='height:50px;' placeholder='Amount to donate' max='10000000' step='1000' min='1000'/>
                    </div>
                </div>
   				<div class='form-group'>
                    <div class='col-sm-12' style=''>
                 				    <input type='email' id='email-address' required class='form-control' placeholder='Your Email' style='height:50px;'/>
  					</div>
  				</div>
                <div class='form-group' style='margin-top:30px;'>
                    <div class='col-sm-12'>
                            <button type='submit' onclick='payWithPaystack()' class='btn btn-default em hover theme2' id='proceedtopay' style='padding:10px 15px 10px 15px; font-size:16px; border:2px solid #2186f3;'>Proceed to pay</button>
                    </div>
                </div>
                <p style='font-weight:bold; font-size:10px; font-family:sans-serif;'> Your contribution to making this service free is awesomely welcomed. THANKS.</p>
            
			</form>


<script src='https://js.paystack.co/v1/inline.js'></script> 
		</div>";


		/*          	<form id='paymentForm'>
          	<input type='hidden' name='amount' id='sess_amount'>
  <div class='form-group'>
    <label for='email'>Email Address</label>
    <input type='email' id='email-address' required />
  </div>
  <div class='form-group'>
    <label for='first-name'>First Name</label>
    <input type='text' id='first-name' />
  </div>
  <div class='form-group'>
    <label for='last-name'>Last Name</label>
    <input type='text' id='last-name' />
  </div>
  <div class='form-submit'>
    <button type='submit' onclick='payWithPaystack()'> Pay </button>
  </div>
</form>
*/