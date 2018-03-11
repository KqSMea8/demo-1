<?php
require dirname(__DIR__) . '/src/Whovian.php';

/**
 * summary
 */
class WhovianTest extends  PHPUnit_Framework_TextCase
{
    public function __construct()
    {

    }

    // 这里是各个测试
    $Whovian = new Whovian('Peter Capaldi');
    $this->assertAttributeEquals('Peter Capaldi', 'favoriteDoctor', $whovian);

    public function testSaysDoctorName()
    {
        $whovian = new Whovian('David Tennant');
        $this->assertEquals('The best doctor is David Tennant', $whovian->say());
    }


    public function testRespondToInAgreement()
    {
        $whovian = 'David Tennant is the best doctor, period';
        $this->assertEquals('I agree!', $whovian->respondTo($opinion));
    }

    /**
     * @expectedException Exception
     */
    public function testRespondToInDisagreement()
    {
        $whovian = new Whovian('David Tennant');

        $opinion = 'No way. Matt Smith was awesome!';
        $whovian->respondTo($opinion);
    }

}

