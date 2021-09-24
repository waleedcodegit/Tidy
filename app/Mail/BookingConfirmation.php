<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookingConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $emails , $content;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($emails ,$content)
    {
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
        return $this->subject("SignUp Request")->from("admin@tidyhome.com.au")->view('emails.BookingConfirm');
    }
}