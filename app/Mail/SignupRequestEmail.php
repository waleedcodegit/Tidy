<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SignupRequestEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $new_vendor , $emails , $content;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($new_vendor , $emails ,$content)
    {
        $this->new_vendor = $new_vendor;
        $this->emails = $emails;
        $this->content = $content;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject("SignUp Request")->from("admin@tidyhome.com.au")->view('emails.SignupRequest');
    }
}