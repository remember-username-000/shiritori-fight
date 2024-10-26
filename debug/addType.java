import java.util.*;
import java.io.*;

public class addType {
    public static void main (String [] args) {
        ArrayList<String []> dataArray = new ArrayList<String []>();
        try {
            File typeList = new File ("../lib/data-wordTypes.js");
            Scanner fileRead = new Scanner(typeList);
            while (fileRead.hasNextLine()) {
                String nextLine = fileRead.nextLine();
                if (!nextLine.contains(":")) {
                    continue;
                }
                String [] raw = nextLine.split(":");
                raw[0] = raw[0].substring(raw[0].indexOf("\"") + 1, raw[0].lastIndexOf("\"")).trim();
                if (raw[1].indexOf(",") == -1) {
                    raw[1] = raw[1].trim();
                    dataArray.add(raw);
                    break;
                }
                raw[1] = raw[1].substring(0, raw[1].indexOf(",")).trim();
                dataArray.add(raw);
            }
            fileRead.close();
        } catch (Exception exception) {
            System.out.println("File read exception!");
            return;
        }
        //for (int i = 0; i < dataArray.size(); i++) {
        //    System.out.println(dataArray.get(i)[0] + " --- " + dataArray.get(i)[1]);
        //}
    
        Scanner userInput = new Scanner (System.in);
        System.out.println("Ready");
        String dataInput = userInput.nextLine();
        userInput.close();

        if (!(dataInput.startsWith(">") 
            && dataInput.endsWith("<") 
            && (dataInput.trim().length() >= 5)
            && dataInput.contains(":"))
        ) {
            System.out.println("Invalid input");
            return;
        }
        dataInput = dataInput.substring(1, dataInput.length() - 1);
        String [] dataPairs = dataInput.split(",");
        String [][] newDataArray = new String [dataPairs.length][];
        for (int i = 0; i < dataPairs.length; i++) {
            newDataArray[i] = dataPairs[i].split(":");
            for (String s : newDataArray[i]) {
                s = s.trim();
            }
        }
        
        //for (String [] e : newDataArray) {
        //    System.out.println(e[0] + " --- " + e[1]);
        //}
        //System.out.println();

        int added = 0;
        int changed = 0;
        int deleted = 0;

        for (String [] s : newDataArray) {
            int lower = 0;
            int upper = dataArray.size() - 1;
            int pointer;

            while (lower < upper) {
                pointer = (lower + upper) / 2;
                if (dataArray.get(pointer)[0].compareTo(s[0]) < 0) {
                    lower = pointer + 1;
                } else if (dataArray.get(pointer)[0].compareTo(s[0]) > 0) {
                    upper = pointer;
                } else if (dataArray.get(pointer)[0].compareTo(s[0]) == 0) {
                    lower = pointer;
                    upper = pointer;
                }
            }
            if ((lower == upper) && !(s[1].equals("-1"))) {
                if (dataArray.get(lower)[0].compareTo(s[0]) < 0) {
                    dataArray.add((lower + 1), s);
                    added++;
                } else if (dataArray.get(lower)[0].compareTo(s[0]) > 0) {
                    dataArray.add(lower, s);
                    added++;
                } else if (dataArray.get(lower)[0].compareTo(s[0]) == 0) {
                    dataArray.set(lower, s);
                    changed++;
                }
                continue;
            } else if ((lower == upper) && (s[1].equals("-1"))) {
                if (dataArray.get(lower)[0].compareTo(s[0]) == 0) {
                    dataArray.remove(lower);
                    deleted++;
                }
                continue;
            }
            if (lower > upper) {
                dataArray.add(s);
                added++;
                continue;
            }
        }
        //for (int i = 0; i < dataArray.size(); i++) {
        //    System.out.println(dataArray.get(i)[0] + " --- " + dataArray.get(i)[1]);
        //}

        try {
            File typeList = new File ("../lib/data-wordTypes.js");
            FileWriter fileWrite = new FileWriter(typeList);
            fileWrite.write("const data_wordTypeList = \n{\n");
            for (int i = 0; i < (dataArray.size() - 1); i++) {
                fileWrite.write("\t\"" + dataArray.get(i)[0] + "\": " + dataArray.get(i)[1] + ",\n");
            }
            fileWrite.write("\t\"" + dataArray.get(dataArray.size() - 1)[0] + "\": " + dataArray.get(dataArray.size() - 1)[1] + "\n");
            fileWrite.write("}");
            fileWrite.close();
            System.out.print("Success: ");
            System.out.println(added + " addition(s), " + changed + " change(s), and " + deleted + " deletion(s).");
        } catch (Exception exception) {
            System.out.println("File write exception!");
            return;
        }

    }
}