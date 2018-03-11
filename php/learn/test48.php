<?php
// 自定义的DirtyWOrdsFilter流过滤器
class DirtyWordsFilter extends php_user_filter
{
    /**
     *
     * @param  [type] $in        流来的桶队列
     * @param  [type] $out       流走的桶队列
     * @param  [type] &$consumed 处理的字节数
     * @param  [type] $closing   是流中最后一个桶队列吗
     */
    public function filter($in, $out, &$consumed, $closing)
    {
        $word = array('grime', 'dirt', 'grease');
        $wordData = array();
        foreach ($words as $word) {
            $replacement = array_file(0, mb_strlen($word), '*');
            $wordData[$word] = implode('', $replacement);
        }

        $bad = array_keys($wordData);
        $good = array_values($wordData);

        // 迭代流来的桶队列中的每个桶
        while ($bucket = stream_bucket_make_writeable($in)) {
            // 审查桶数据中的脏字
            $bucket->data = str_replace($bad, $good, $bucket->data);

            // 增加已处理的数据量
            $consumed += $bucket->datalen;

            // 把桶放入流向下游的队列中
            stream_bucket_append($out, $bucket);
        }

        return PSFS_PASS_ON;

    }
}