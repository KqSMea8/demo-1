<?php
/**
 * summary
 */
class CommandOutpubDocument implements Dcouementable
{
    protected $command;
    /**
     * summary
     */
    public function __construct($command)
    {
        $this->command = $command;
    }

    public function getId()
    {
        return $this->command;
    }

    public function getContent()
    {
        return shell_exec($this->command);
    }
}

