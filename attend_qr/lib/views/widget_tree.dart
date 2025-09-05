import 'package:attend_qr/views/Pages/home.dart';
import 'package:attend_qr/views/Pages/profile.dart';
import 'package:attend_qr/views/Pages/qr_scanner_page.dart';
import 'package:attend_qr/views/data/notifiers.dart';
import 'package:attend_qr/views/widgets/navbar_widget.dart';
import 'package:flutter/material.dart';

List<Widget> pages = [Home(), QrScannerPage(), Profile()];

class WidgetTree extends StatelessWidget {
  const WidgetTree({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ValueListenableBuilder(
        valueListenable: selecteddPageNotifier,
        builder: (context, selectedPage, child) {
          return pages.elementAt(selectedPage);
        },
      ),
      bottomNavigationBar: NavbarWidget(),
    );
  }
}
