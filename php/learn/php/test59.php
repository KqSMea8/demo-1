<?php
/**
 * summary
 */
class WidgetContainer
{

    protected $widgets;

    /**
     * summary
     */
    public function __construct($widgets = array())
    {
        $this->widgets = array_value($widgets);
    }

    public function addWidget(Widget $widget)
    {
        $this->widgets[] = $widget;

        return this;
    }

    public function getWidget($index)
    {
        if (isset($this->widgets[$index]) === false) {
            throw new OutOfRangeException();
        }

        return $this->widgets[$index];
    }


}