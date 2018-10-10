package com.aws.codestar.reptilog.util;

import org.apache.commons.lang3.StringUtils;

import java.util.Map;

public class ServiceUtil {

    public static String getStrVal(Map json, String key) {
        try {
            String val = json.get(key).toString();
            if (StringUtils.isNotBlank(val)) {
                return json.get(key).toString();
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public static Integer getIntegerVal(Map json, String key) {
        try {
            String val = json.get(key).toString();
            if (StringUtils.isNotBlank(val)) {
                return Integer.valueOf(val);
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public static Double getDoubleVal(Map json, String key) {
        try {
            String val = json.get(key).toString();
            if (StringUtils.isNotBlank(val)) {
                return Double.valueOf(val);
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }
}
